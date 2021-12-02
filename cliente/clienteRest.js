function ClienteRest() {
  //var iu = new.ControlWeb();
  this.agregarJugador = function (nick) {
    $.getJSON("/agregarJugador/" + nick, function (data) {
      console.log(data);
      var nick = data.nick;
      if (nick != -1) {
        iu.mostrarCrearPartida(nick);
      } else {
        alert("Esto es un error");
      }
    });
  };
  this.crearPartida = function (nick, njug) {
    $.getJSON("/crearPartida/" + nick + "/" + njug, function (data) {
      console.log(data);
    });
  };
  this.unirAPartida = function (nick, codigo) {
    $.getJSON("/unirAPartida/" + nick + "/" + codigo, function (data) {
      console.log(data);
    });
  };
  this.obtenerListaPartidas = function (nick) {
    $.getJSON("/obtenerListaPartidas/", function (data) {
      console.log(data);
      //iu.mostrarlistapartidas(data);
    });
  };
  this.obtenerListaPartidasDisponibles = function (nick) {
    $.getJSON("/obtenerListaPartidasDisponibles/", function (data) {
      console.log(data);
      //iu.mostrarlistapartidasDisponibles(data);
    });
  };
}
