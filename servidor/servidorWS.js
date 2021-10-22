
function ServidorWS(){
    //Zona cliente del servidor WS, contiene métodos genéricos
    this.enviarAlRemitente=function(socket,mensaje,datos){
        socket.emit(mensaje,datos);
    }
    this.enviarATodos=function(io,codigo,mens,datos){
        io.sockets.in(codigo).emit(mens,datos);
    }
    //Zona servidor del servidor WS.
    this.lanzarServidorWS=function(io,juego){
        var cli = this; // variable para que el contexto de la ejecución continúe en este objeto 
        io.on("connection", function(socket){
            console.log("Usuario conectado");

            socket.on("crearPartida",function(nick,num){
                var jugador = juego.usuarios[nick];
                var res={codigo:-1};                
                var partida = jugador.crearPartida(num);
                console.log("Nueva partida de " + nick + ", codigo:" + jugador.codigoPartida);
                res.codigo = jugador.codigoPartida;
                socket.join(res.codigo);                
                cli.enviarAlRemitente(socket,"partidaCreada",res);
            })
            socket.on("unirAPartida",function(nick,codigo){
                var jugador = juego.usuarios[nick];
                var res={codigo:-1};
                jugador.unirAPartida(codigo);
                console.log("El jugador " + nick + " se ha unido a la partida con codigo: " + jugador.codigoPartida );
                res.codigo=jugador.codigoPartida;
                if(res.codigo!=-1){
                    socket.join(res.codigo);
                    cli.enviarAlRemitente(socket,"unidoAPartida",res);  
                    if(partida.fase.nombre=="jugando"){
                            cli.enviarATodos(io,codigo,"pedirCartas",{});
                    }
                }
                else{
                    cli.enviarAlRemitente(socket,"fallo",res);
                }                             
            })
            socket.on("manoInicial",function(nick){
                var jugador = juego.usuarios[nick];
                jugador.manoInicial();
                cli.enviarAlRemitente(socket,"mano",jugador.mano);
            })
        })
    }
}
module.exports.ServidorWS = ServidorWS;