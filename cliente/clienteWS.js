function ClienteWS() {
  //Creo el socket
  this.socket;
  this.nick;
  this.codigo;
  this.conectar = function () {
    //Almaceno la conexión en el socket para poder arrancar en otro momento
    this.socket = io();
    //Servidor WS del cliente
    this.servidorWSCliente();
  };
  this.crearPartida = function (nick, num) {
    this.nick = nick;
    this.socket.emit("crearPartida", nick, num);
  };
  this.unirAPartida = function (nick, codigo) {
    this.nick = nick;
    this.socket.emit("unirAPartida", nick, codigo);
  };
  this.manoInicial = function () {
    this.socket.emit("manoInicial", this.nick);
  };
  this.jugarCarta = function (num) {
    this.socket.emit("jugarCarta", this.nick, num);
  };
  this.robarCarta = function (num) {
    this.socket.emit("robarCarta", this.nick, num);
  };
  this.pasarTurno = function () {
    this.socket.emit("pasarTurno", this.nick);
  };
  this.abandonarPartida=function(){
    this.socket.emit("abandonarPartida",this.nick);
}
this.cerrarSesion=function(){
    this.socket.emit("cerrarSesion",this.nick);
}
  //Servidor WS del cliente
  this.servidorWSCliente = function () {
    var cli = this;
    this.socket.on("connect", function () {
      console.log("Conectado al servidor de WS");
    });
    //Entrada para la respuesta del WS
    this.socket.on("partidaCreada", function (data) {
      console.log(data);
      cli.codigo = data.codigo;
    });
    this.socket.on("unidoAPartida", function (data) {
      console.log(data);
      cli.codigo = data.codigo;
    });
    this.socket.on("nuevaPartida", function(data){
      if(!cli.codigo && cli.nick){
          iu.mostrarPartidasDisponibles(data);
      }
    });
    this.socket.on("pedirCartas", function (data) {
      cli.manoInicial();
    });
    this.socket.on("mano", function (data) {
      console.log("mano Inicial");
      console.log(data);
      iu.mostrarMano(data);
      //cli.metoca
    });
    this.socket.on("turno", function (data) {
      console.log("turno");
      console.log(data);
      iu.mostrarCartaActual(data.cartaActual);
    });
    this.socket.on("final", function (data) {
      if(data.ganador == cli.nick){
        iu.mostrarModal("Ganador")
    }
    else{
        iu.mostrarModal("Perdedor")
    }
     
      console.log(data);
    });
    this.socket.on("fallo", function (data) {
      console.log(data);
    });
    this.socket.on("jugadorAbandona",function(){
      iu.mostrarModal("Un Jugador abandona la partida");
      iu.limpiar();
      iu.mostrarHome({nick:cli.nick});
      cli.codigo="";
    });
  this.socket.on("usuarioEliminado",function(){
      cli.nick="";
      cli.codigo="";
      $.removeCookie("nick");
      iu.limpiar();
      iu.mostrarAgregarJugador();
    });

  };
  this.conectar();
}
