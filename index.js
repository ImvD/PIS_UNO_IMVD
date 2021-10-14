var fs = require("fs");
var express = require("express");
var app=express();
var server = require("http").Server(app); 
//Para desempaquetar la información del post
var bodyParser = require("body-parser");
var modelo=require("./servidor/modelo.js");

var juego = new modelo.Juego();

app.set('port',process.env.PORT || 5000);

app.use(express.static(__dirname + "/"));

//Para cada petición Get se usa una función de callback
app.get("/", function(request,response){
    var contenido = fs.readFileSync(__dirname+"/cliente/index.html");
    response.setHeader("Content-type","text/html");
    response.send(contenido);
});

//Agregar jugador
app.get("/agregarJugador/:nick",function(request,response){
    var nick=request.params.nick;
    var res = juego.agregarJugador(nick);
    response.send(res);

} );
//Crear partida
app.get("/crearPartida/:nick/:njug",function(request,response){
    var nick=request.params.nick;
    var njug = request.params.njug;
    var jugador = juego.usuarios[nick];
    var res={codigo:-1};
    if(jugador){
        var partida = jugador.crearPartida(njug);
        res.codigo = jugador.codigoPartida;
    }
    response.send(res);

} );
//Unir a partida
app.get("/unirAPartida/:nick",function(request,response){
    var nick=request.params.nick;
    juego.unirAPartida(nick,codigo)

} );
//Obtener lista de partidas 
app.get("/agregarJugador/:nick",function(request,response){
    var nick=request.params.nick;
    juego.agregarJugador(nick);

} );
app.listen(app.get('port'),function(){
    console.log("La app NodeJS se está ejecutando en el puerto", app.get('port'));
});