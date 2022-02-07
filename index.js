var fs = require("fs");
var express = require("express");
var app = express();
var http = require("http").Server(app);
//Añadimos el Web Socket, primero importando el módulo y creando el servidor con el servidor http
var { Server } = require("socket.io");
var io = new Server(http);
//Para desempaquetar la información del post
var bodyParser = require("body-parser");

//Var passport
var passport =require("passport");
//Var cookieSession
var cookieSession = require("cookie-session");

var LocalStrategy = require("passport-local").Strategy;

require("./servidor/passport-setup.js");
var modelo = require("./servidor/modelo.js");
//Servidor de WS
var ssrv = require("./servidor/servidorWS.js");

var juego = new modelo.Juego(false);
var servidorWS = new ssrv.ServidorWS();

app.set("port", process.env.PORT || 5000);

app.use(express.static(__dirname + "/"));

//Bodyparser --
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "clave" },
    function (email, clave, done) {
      juego.loginUsuario(email, clave, function (err, user) {
        if (err) {
          return done(err);
        } else {
          return done(null, user);
        }
      });
    }
  )
);

//CookieSession
app.use(cookieSession({
	name:'juego-uno',
	keys:['key1','key2']
}));

app.use(passport.initialize());
app.use(passport.session());



const haIniciado=function(request,response,next){
	if (request.user){
		next();
	}
	else{
		response.redirect('/');
	};
};

//Para cada petición Get se usa una función de callback
app.get("/", function (request, response) {
  var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
  response.setHeader("Content-type", "text/html");
  response.send(contenido);
});

//Rutas a definir para validar a usuarios con OAuth2.0
// /auth/google -> preguntamos a Google para validarse
// /auth/instagram -> "" a Instagram
// ...

app.get("/auth/google", passport.authenticate('google',{scope:['profile','email']}));
// /google/callback -> aqui llega la respuesta de google
// /good -> en caso de usuario valido
// /fail -> en caso de usuario no valido

app.get("/good",function(request,response){
	//definir el nick como el email del usuario de Google
	//agregarJugador(nick)
	var nick = request.user.emails[0].value;
	juego.agregarJugador(nick);
	response.cookie('nick',nick);
	response.redirect("/");
});

app.get("/fallo",function(request,response){
	response.send("No se pudo iniciar sesion");
});

app.get("/google/callback",passport.authenticate('google',{failureRedirect:'/fallo'}),function(request,response){
	response.redirect("/good");
});

//Agregar jugador
app.get("/agregarJugador/:nick", function (request, response) {
  var nick = request.params.nick;
  var res = juego.agregarJugador(nick);
  response.send(res);
});


app.post('/registrarUsuario',function(request,response){
	var email=request.body.email;
	var clave=request.body.clave;

	juego.registrarUsuario(email,clave,function(data){
		response.send(data);
	})
});
//login
/*
app.post('/loginUsuario',function(request,response){
	var email=request.body.email;
	var clave=request.body.clave;
	juego.registrarUsuario(email,clave,function(data){
		response.send(data);
	})
});*/

app.post("/loginUsuario",passport.authenticate("local", {failureRedirect: "/fallo",successRedirect: "/ok",}));
app.get("/ok", haIniciado, function (request, response) {
  response.send({ nick: request.user.nick });
});

//Crear partida
app.get("/crearPartida/:nick/:njug",haIniciado,function(request, response) {
  var nick = request.params.nick;
  var njug = request.params.njug;
  var jugador = juego.usuarios[nick];
  var res = { codigo: -1 };
  if (jugador) {
    var partida = jugador.crearPartida(njug);
    console.log("Nueva partida de " + nick + " codigo: " + jugador.codigoPartida);
    res.codigo = jugador.codigoPartida;
  }
  response.send(res);
});
//Unir a partida
app.get("/unirAPartida/:nick/:codigo", function (request, response) {
  var nick = request.params.nick;
  var codigo = request.params.codigo;
  var jugador = juego.usuarios[nick];
  var res = { codigo: -1 };
  //var res = juego.partidas[codigo];
  if (jugador) {
    var partida = jugador.unirAPartida(codigo);
    console.log(
      "El jugador " + nick + " se ha unido a la partida con codigo: " + codigo
    );
    console.log("Estoy en Index.js 159");
    //res.codigo = jugador.codigoPartida;
  }
  //response.send(res);
});

app.get("/confirmarUsuario/:direccion/:key", function (request, response) {
  var email = request.params.direccion;
  var key = request.params.key;
  
  juego.confirmarUsuario(email,key,function(data){
    //Comprobar data y si ha ido bien le mando al login
    response.send(data);
  });
 });


//Obtener lista de partidas
app.get("/obtenerListaPartidas",haIniciado, function (request, response) {
  if (juego) {
    var lista = juego.obtenerTodasPartidas();
    response.send(lista);
  }
});
//Obtener lista de partidas disponibles
app.get("/obtenerListaPartidasDisponibles", function (request, response) {
  if (juego) {
    var lista = juego.obtenerTodasPartidasDisponibles();
    response.send(lista);
  }
});
app.get("/obtenerTodosResultados",function(request,response){
	if (juego){
			juego.obtenerTodosResultados(function(lista){
			response.send(lista)
		});
	}
});

app.get("/obtenerResultados/:nick",function(request,response){
	var nick=request.params.nick;
	if (juego){
		juego.obtenerTodosResultados({ganador:nick},function(lista){
			response.send(lista);
		})
	
	}
});
//Prueba**********
app.get("/obtenerDatosPartida/:codigo",function(request,response){
  var codigo = request.params.codigo;
  var partida;
  if (codigo){
    partida = juego.partidas[codigo];
    //response.send(codigo);
    response.send(partida);
  }
})
app.get("/cerrarSesion/:nick",function(request,response){
	var nick=request.params.nick;
	var ju1=juego.usuarios[nick];

	if (ju1){
		ju1.cerrarSesion();
			response.send({res:"ok"});
	}
})
http.listen(app.get("port"), function () {
  console.log("La app NodeJS se está ejecutando en el puerto ",app.get("port"));
});
//Lanzo el servidor de WS
servidorWS.lanzarServidorWS(io, juego);

