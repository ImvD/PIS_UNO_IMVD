function Juego() {
  this.usuarios = {};
  this.partidas = {};

  
  this.agregarJugador = function (nick) {
    var res = { nick: -1 };
    if (!this.usuarios[nick]) {
      var jugador = new Jugador(nick, this);
      this.usuarios[nick] = jugador;
      res = { nick: nick };
    } else {
      console.log("El usuario" + nick + " ya está creado");
    }
    return res;
  };
  this.crearPartida = function (nick, numJug) {
    var codigo = "-1";
    var jugador = this.usuarios[nick];
    var partida;
    //crear código único de partida (Función auxiliar, dado el abecedario te devuelva un código de 6 letras como una matrícula) para generar el código de la partida
    if (numJug >= 2 && numJug <= 8) {
      codigo = this.obtenerCodigo();
      //Si la partida existe, crea un nuevo código
      while (this.partidas[codigo]) {
        codigo = this.obtenerCodigo();
      }
      //crear instancia de partida
      partida = new Partida(codigo, jugador, numJug);
      //asignarla al array asociativo (Colección)
      this.partidas[codigo] = partida;
    }
    return partida;
  };
  this.unirAPartida = function (nick, codigo) {
    if (this.partidas[codigo]) {
      var jugador = this.usuarios[nick];
      this.partidas[codigo].unirAPartida(jugador);
      //console.log( nick + " se ha añadido a la partida de código " + codigo );
    }
  };
  this.obtenerTodasPartidas = function () {
    var lista = [];
    for (each in this.partidas) {
      var partida = this.partidas[each];
      lista.push({ propietario: partida.propietario, codigo: each });
    }
    return lista;
  };
  this.obtenerTodasPartidasDisponibles = function () {
    var lista = [];
    for (each in this.partidas) {
      var partida = this.partidas[each];
      lista.push({ propietario: partida.propietario, codigo: each });
    }
    return lista;
  };
  this.obtenerCodigo = function () {
    let cadena = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    let letras = cadena.split("");
    let maxCadena = cadena.length;
    let codigo = [];
    for (i = 0; i < 6; i++) {
      codigo.push(letras[randomInt(1, maxCadena) - 1]);
    }
    return codigo.join("");
  };
  this.numeroPartidas = function () {
    return Object.keys(this.partidas).length;
  };
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

function Jugador(nick, juego) {
  this.nick = nick;
  this.juego = juego;
  this.mano = [];
  this.codigoPartida;
  this.puntos = 0;
  //El jugador es el que crea la partida
  this.crearPartida = function (numJug) {
    return this.juego.crearPartida(nick, numJug);
  };
  this.unirAPartida = function (codigo) {
    this.juego.unirAPartida(nick, codigo);
  };
  this.obtenerPartida = function (codigo) {
    return this.juego.partidas[codigo];
  };
  this.manoInicial = function () {
    var partida = this.obtenerPartida(this.codigoPartida);
    this.mano = partida.dameCartas(7);
  };
  this.robar = function (num) {
    var partida = this.obtenerPartida(this.codigoPartida);
    if (partida.turno.nick == this.nick) {
      var robadas = partida.dameCartas(num);
      this.mano = this.mano.concat(robadas);
    }
  };
  this.pasarTurno = function () {
    var partida = this.obtenerPartida(this.codigoPartida);
    partida.pasarTurno(this.nick);
    this.robar(1);
  };
  this.jugarCarta = function (num) {
    var carta = this.mano[num];
    if (carta) {
      var partida = this.obtenerPartida(this.codigoPartida);
      partida.jugarCarta(carta, this.nick);
    }
  };
  this.quitarCarta = function (carta) {
    var partida = this.obtenerPartida(this.codigoPartida);
    var indice = this.mano.indexOf(carta);
    this.mano.splice(indice, 1);
    if (this.mano.length <= 0) {
      partida.finPartida();
    }
  };
  //this.recibeturno
  this.recibeTurno= function(this){

  };

  this.bloquear = function () {
    this.estado = new Bloqueado();
  };
}

function Normal() {
  this.nombre = "normal";
  this.recibeTurno = function (partida, jugador) {
    partida.jugadorPuedeJugar(jugador);
  };
}

function Bloqueado() {
  this.nombre = "bloqueado";
  this.recibeTurno=function(partida,jugador){
    partida.jugadorPuedeJugar(jugador);
    jugador.pasarTurno();
    jugador.estado = new Normal();
  }

}

function Partida(codigo, jugador, numJug) {
  this.codigo = codigo;
  this.propietario = jugador.nick;
  this.numJug = numJug;
  this.jugadores = {}; //Array tipo Diccionario
  this.mazo = [];
  this.ordenTurno = []; //Array común con índice. Cuando el jugador llega a la partida guarda su índice
  this.direccion = new Derecha();
  this.turno;
  this.mesa = [];
  this.cartaActual;
  //Creamos la fase como Inicial
  this.fase = new Inicial();

  this.unirAPartida = function (jugador) {
    this.fase.unirAPartida(this, jugador);
  };
  this.puedeUnirAPartida = function (jugador) {
    this.jugadores[jugador.nick] = jugador;
    jugador.codigoPartida = this.codigo;
    this.ordenTurno.push(jugador.nick); //Añado al jugador que se une a la partida
  };
  //Función que devuelve el nº de jugadores de la partida
  this.numeroJugadores = function () {
    //Coge el nº de las claves del array asociativo (nick de Jugadores)
    return Object.keys(this.jugadores).length;
  };
  this.crearMazo = function () {
    var colores = ["azul", "amarillo", "verde", "rojo"];
    for (i = 0; i < colores.length; i++) {
      //Añadimos los 0
      this.mazo.push(new Numero(0, colores[i]));
      //Añadimos el resto de números
      for (j = 1; j < 5; j++) {
        this.mazo.push(new Numero(j, colores[i]));
        //this.mazo.push(new Numero(j,colores[i]));
      }

      this.mazo.push(new Cambio(20, colores[i]));
      //this.mazo.push(new Cambio(20,colores[i]));

      this.mazo.push(new Bloqueo(20, colores[i]));
      this.mazo.push(new Bloqueo(20, colores[i]));

      /* 
            this.mazo.push(new Mas2(20,colores[i]));
            this.mazo.push(new Mas2(20,colores[i]));
        
        for (i=1;i<5;i++){
            this.mazo.push(new Comodin(20));
            this.mazo.push(new Comodin4(20));
        }*/
    }
  };
  this.asignarUnaCarta = function () {
    var resultado;
    //Obtienes la longitud del mazo
    var longitudMazo = this.mazo.length;
    if (longitudMazo > 0) {
      var aleatorio = Math.random() * longitudMazo;
      var cartaretirada = this.mazo.splice(aleatorio, 1);
      resultado = cartaretirada[0];
    }
    return resultado;
  };
  this.dameCartas = function (num) {
    var cartas = [];
    for (i = 0; i < num; i++) {
      var carta = this.asignarUnaCarta();
      //Si existe la carta la añadimos
      if (carta) {
        cartas.push(carta);
      }
    }
    return cartas;
  };
  this.pasarTurno = function (nick) {
    this.fase.pasarTurno(nick, this);
  };
  this.puedePasarTurno = function (nick) {
    if (nick == this.turno.nick) {
      this.direccion.pasarTurno(this);
    }
  };
  this.asignarTurno = function () {
    var nick = this.ordenTurno[0];
    this.turno = this.jugadores[nick];
  };
  this.jugadorPuedeJugar = function (jugador) {
    this.turno = jugador;
  };
  this.jugarCarta = function (carta, nick) {
    this.fase.jugarCarta(carta, nick, this);
  };
  //Do it
  this.quitarCarta = function (carta) {};
  this.puedeJugarCarta = function (carta, nick) {
    if (nick == this.turno.nick) {
      if (this.comprobarCarta(carta)) {
        //Comprobar el efecto de la carta
        carta.comprobarEfecto(this);
        //Cambiar la carta actual
        //Poner en la colección mesa la que había
        this.cambiarCartaActual(carta);
        //Quitar la carta de la mano del jugador
        this.turno.quitarCarta(carta);
        //Pasar turno
        this.pasarTurno(nick);
      }
    }
  };
  this.cambiarCartaActual = function (carta) {
    this.mesa.push(this.cartaActual);
    this.cartaActual = carta;
  };
  this.comprobarCarta = function (carta) {
    //Tengo que comprobar que la carta que deseo jugar la puedo jugar según la que haya en la mesa.
    return (
      (this.cartaActual.tipo == "numero" &&
        (this.cartaActual.color == carta.color ||
          this.cartaActual.valor == carta.valor)) ||
      (this.cartaActual.tipo == "cambio" &&
        (this.cartaActual.color == carta.color ||
          this.cartaActual.tipo == carta.tipo)) ||
      (this.cartaActual.tipo == "bloqueo" &&
        (this.cartaActual.color == carta.color ||
          this.cartaActual.tipo == carta.tipo))
    );
    //||this.cartaActual.tipo=="bloqueo" && (this.cartaActual.color==carta.color ||this.cartaActual.tipo==carta.tipo )
  };
  this.cartaInicial = function () {
    //cojo una carta al azar
    this.cartaActual = this.asignarUnaCarta();
  };
  this.cambiarDireccion = function () {
    if (this.direccion.nombre == "Derecha") {
      this.direccion = new Izquierda();
    } else {
      this.direccion = new Derecha();
    }
  };
  this.finPartida = function () {
    this.fase = new Final();
    this.calcularPuntos();
  };
  this.calcularPuntos = function () {
    var suma = 0;
    for (jug in this.jugadores) {
      for (i = 0; i < this.jugadores[jug].mano.length; i++) {
        suma = suma + this.jugadores[jug].mano[i].valor;
      }
      //Si quieres que cada jugador de sus puntos, hay que delegar en el para que se calcule sus puntos
    }
    this.turno.puntos = suma;
  };

  this.bloquearSiguiente = function () {};
  //Siempre tiene que ser la última línea
  this.crearMazo();
  this.unirAPartida(jugador);
}
//Objetos del juego
function Derecha() {
  this.nombre = "Derecha";
  this.pasarTurno = function (partida) {
    //Ver el nick del que tiene el turno
    //Calcular el índice en el array OrdenTurno, como estoy en la derecha le sumo 1 al índice % array.lenght
    //Asignar el turno al nuevo jugador
    var nick = partida.turno.nick;
    var indice = partida.ordenTurno.indexOf(nick);
    var siguiente = (indice + 1) & Object.keys(partida.jugadores).length;
    partida.turno = partida.jugadores[partida.ordenTurno[siguiente]];
  };
}
function Izquierda() {
  this.nombre = "Izquierda";
  this.pasarTurno = function (partida) {
    var nick = partida.turno.nick;
    var indice = partida.ordenTurno.indexOf(nick);
    var siguiente = (indice - 1) % Object.keys(partida.jugadores).length;
    if (siguiente < 0) {
      siguiente = Object.keys(partida.jugadores).length - 1;
    }
    partida.turno = partida.jugadores[partida.ordenTurno[siguiente]];
  };
}
function Inicial() {
  this.nombre = "inicial";
  this.unirAPartida = function (partida, jugador) {
    partida.puedeUnirAPartida(jugador);
    //Si numero de jugadores < numJug
    if (partida.numeroJugadores() == partida.numJug) {
      partida.fase = new Jugando();
      partida.asignarTurno();
      partida.cartaInicial();
    }
  };
  this.jugarCarta = function (carta, nick, partida) {
    console.log("La partida no ha comenzado");
  };
  this.pasarTurno = function (nick, partida) {
    console.log("La partida no ha comenzado");
  };
}
function Jugando() {
  this.nombre = "jugando";
  this.unirAPartida = function (partida, jugador) {
    console.log("La partida ya ha comenzado");
    jugador.codigoPartida = -1;
  };
  this.jugarCarta = function (carta, nick, partida) {
    partida.puedeJugarCarta(carta, nick);
  };

  this.pasarTurno = function (nick, partida) {
    partida.puedePasarTurno(nick);
  };
}
function Final() {
  this.nombre = "final";
  this.unirAPartida = function (partida, jugador) {
    console.log("La partida ya ha comenzado");
    jugador.codigoPartida = -1;
  };
  this.jugarCarta = function (carta, nick, partida) {
    console.log("La partida ya ha terminado");
  };

  this.pasarTurno = function (nick, partida) {
    console.log("La partida ha terminado, es el final!!!");
  };
}

//Objetos del mazo
//Números
function Numero(valor, color) {
  this.tipo = "numero";
  this.color = color;
  this.valor = valor;
  this.comprobarEfecto = function (partida) {
    console.log("No hay efecto");
  };
}
//Bloqueos
function Bloqueo(valor, color) {
  this.tipo = "bloqueo";
  this.color = color;
  this.valor = valor;
  this.comprobarEfecto = function (partida) {
    partida.bloquearSiguiente();
  };
}
//Cambio
function Cambio(valor, color) {
  this.tipo = "cambio";
  this.color = color;
  this.valor = valor;
  this.comprobarEfecto = function (partida) {
    partida.cambiarDireccion();
  };
}
//Mas2(Chupate)
function Mas2(valor, color) {
  this.tipo = "mas2";
  this.color = color;
  this.valor = valor;
  this.comprobarEfecto = function (partida) {};
}
//Mas4(Chupate)
function Mas4(valor) {
  this.tipo = "mas4";
  this.color = color;
  this.valor = valor;
  this.comprobarEfecto = function (partida) {};
}
//Comodín
function Comodin(valor) {
  this.tipo = "comodin";
  this.valor = valor;
  this.comprobarEfecto = function (partida) {};
}

//Comodín4

function Comodin4(valor) {
  this.tipo = "comodin4";
  this.valor = valor;
  this.comprobarEfecto = function (partida) {};
}
/*
var juego;
var j1,j2;
var partida;
function Prueba(){
    juego = new Juego();
    juego.agregarJugador("Ana")
    j1 = juego.usuarios["Ana"]
    j1.crearPartida(2)
    juego.agregarJugador("Pepe")
    j2 = juego.usuarios["Pepe"]
    j2.unirAPartida(j1.codigoPartida)
    partida = juego.partidas[j1.codigoPartida]
}*/
module.exports.Juego = Juego;
