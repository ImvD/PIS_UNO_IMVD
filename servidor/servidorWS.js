function ServidorWS() {
  //Zona cliente del servidor WS, contiene métodos genéricos
  this.enviarAlRemitente = function (socket, mensaje, datos) {
    socket.emit(mensaje, datos);
  };
  this.enviarATodos = function (io, codigo, mens, datos) {
    io.sockets.in(codigo).emit(mens, datos);
  };
  this.enviarGlobal = function (socket, mens, datos) {
    socket.broadcast.emit(mens, datos);
  };

  //Zona servidor del servidor WS.
  this.lanzarServidorWS = function (io, juego) {
    var cli = this; // variable para que el contexto de la ejecución continúe en este objeto
    io.on("connection", function (socket) {
      console.log("Usuario conectado");

      socket.on("crearPartida", function (nick, num) {
        var jugador = juego.usuarios[nick];
        if (jugador) {
          var res = { codigo: -1 };
          var partida = jugador.crearPartida(num);
          if (partida) {
            console.log(
              "Nueva partida de " + nick + ", codigo:" + jugador.codigoPartida
            );
            res.codigo = jugador.codigoPartida;
            socket.join(res.codigo);
            cli.enviarAlRemitente(socket, "partidaCreada", res);
          } else {
            cli.enviarAlRemitente(
              socket,
              "fallo",
              "La partida no se puede crear"
            );
          }
        } else {
          cli.enviarAlRemitente(socket, "fallo", "El usuario no existe");
        }
      });
      socket.on("unirAPartida", function (nick, codigo) {
        var jugador = juego.usuarios[nick];
        var res = { codigo: -1 };
        var partida = juego.partidas[codigo];
        if (jugador && partida) {
          jugador.unirAPartida(codigo);
          res.codigo = jugador.codigoPartida;
          if (res.codigo != -1) {
            console.log(
              "El jugador " +
                nick +
                " se ha unido a la partida con codigo: " +
                jugador.codigoPartida
            );
            socket.join(res.codigo);
            var partida = juego.partidas[codigo];
            cli.enviarAlRemitente(socket, "unidoAPartida", res);
            if (partida.fase.nombre == "jugando") {
              console.log("La partida está en fase jugando");
              cli.enviarATodos(io, codigo, "pedirCartas", {});
            }
          } else {
            cli.enviarAlRemitente(socket, "fallo", res);
          }
        } else {
          cli.enviarAlRemitente(socket, "fallo", "El usuario no existe");
        }
      });
      socket.on("manoInicial", function (nick) {
        var jugador = juego.usuarios[nick];
        if (jugador) {
          jugador.manoInicial();
          cli.enviarAlRemitente(socket, "mano", jugador.mano);
          var codigo = jugador.codigoPartida;
          var partida = juego.partidas[codigo];
          var nickTurno = partida.turno.nick;
          cli.enviarAlRemitente(socket, "turno", {
            turno: nickTurno,
            cartaActual: partida.cartaActual,
          });
        } else {
          cli.enviarAlRemitente(socket, "fallo", "El usuario no existe");
        }
      });
      socket.on("jugarCarta", function (nick, num) {
        var jugador = juego.usuarios[nick];
        if (jugador) {
          jugador.jugarCarta(num);
          cli.enviarAlRemitente(socket, "mano", jugador.mano);
          var codigo = jugador.codigoPartida;
          var partida = juego.partidas[codigo];
          var nickTurno = partida.turno.nick;
          cli.enviarATodos(io, codigo, "turno", {
            turno: nickTurno,
            cartaActual: partida.cartaActual,
          });
          if (partida.fase.nombre == "final") {
            console.log("La partida está en fase final");
            cli.enviarATodos(io, codigo, "final", { ganador: nickTurno });
          }
        } else {
          cli.enviarAlRemitente(socket, "fallo", "El usuario no existe");
        }
      });
      socket.on("robarCarta", function (num) {
        var jugador = juego.usuarios[nick];
        if (jugador) {
          jugador.robar(num);
          cli.enviarAlRemitente(socket, "mano", jugador.mano);
        } else {
          cli.enviarAlRemitente(socket, "fallo", "El usuario no existe");
        }
      });
      socket.on("pasarTurno", function (nick) {
        var jugador = juego.usuarios[nick];
        if (jugador) {
          jugador.pasarTurno();
          var codigo = jugador.codigoPartida;
          var partida = juego.partidas[codigo];
          var nickTurno = partida.turno.nick;
          cli.enviarAlRemitente(socket, "turno", {
            turno: nickTurno,
            cartaActual: partida.cartaActual,
          });
        } else {
          cli.enviarAlRemitente(socket, "fallo", "El usuario no existe");
        }
      });
    });
  };
}
module.exports.ServidorWS = ServidorWS;
