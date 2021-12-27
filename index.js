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
//Var cookieSession

var LocalStrategy = require("passport-local").Strategy;

var modelo = require("./servidor/modelo.js");
//Servidor de WS
var ssrv = require("./servidor/servidorWS.js");

var juego = new modelo.Juego();
var servidorWS = new ssrv.ServidorWS();

app.set("port", process.env.PORT || 5000);

app.use(express.static(__dirname + "/"));

//Bodyparser --

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "clave" },
    function (email, clave, done) {
      juego.loginUsuario(email.clave, function (err, user) {
        if (err) {
          return done(err);
        } else {
          return done(null, user);
        }
      });
    }
  )
);

//Para cada petición Get se usa una función de callback
app.get("/", function (request, response) {
  var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
  response.setHeader("Content-type", "text/html");
  response.send(contenido);
});

//Agregar jugador
app.get("/agregarJugador/:nick", function (request, response) {
  var nick = request.params.nick;
  var res = juego.agregarJugador(nick);
  response.send(res);
});

//login
app.post(
  "/loginUsuario",
  passport.authenticate("local", {
    failureRedirect: "/fallo",
    successRedirect: "/ok",
  })
);

app.get("/ok", haIniciado, function (request, response) {
  response.send({ nick: request.user.nick });
});
app.get("/confirmarUsuario/:direccion/:key", function (request, response) {
  var email = request.params.direccion;
  var key = request.params.key;
  
  juego.confirmarUsuario(email,key,function(data){
    //Comprobar data y si ha ido bien le mando al login
    response.send(data);
  });
 });
//Crear partida
app.get("/crearPartida/:nick/:njug", function (request, response) {
  var nick = request.params.nick;
  var njug = request.params.njug;
  var jugador = juego.usuarios[nick];
  var res = { codigo: -1 };
  if (jugador) {
    var partida = jugador.crearPartida(njug);
    console.log(
      "Nueva partida de " + nick + " codigo: " + jugador.codigoPartida
    );
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
    res.codigo = jugador.codigoPartida;
  }
  response.send(res);
});
//Obtener lista de partidas
app.get("/obtenerListaPartidas", function (request, response) {
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
http.listen(app.get("port"), function () {
  console.log("La app NodeJS se está ejecutando en el puerto", app.get("port"));
});
//Lanzo el servidor de WS
servidorWS.lanzarServidorWS(io, juego);

