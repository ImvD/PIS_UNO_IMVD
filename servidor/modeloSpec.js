var modelo = require("./modelo.js");
//Esjta función define la prueba
describe("El juego del UNO...", function () {
  var juego;

  beforeEach(function () {
    juego = new modelo.Juego(); //Juego(true) Para evitar que los tests se conecten a la bbdd
    juego.agregarJugador("Juan");
    juego.agregarJugador("Ana");
    juego.agregarJugador("Pepe");
  });

  it("Condiciones iniciales", function () {
    expect(juego.numeroPartidas()).toEqual(0);
    expect(juego.obtenerTodasPartidas().length).toEqual(0);
  });

  describe("Ana crea una partida de 2 jugadores..", function () {
    var ju1;
    var partida;

    beforeEach(function () {
      //codigo para crear partida
      ju1 = juego.usuarios["Ana"];
      partida = ju1.crearPartida(2);
    });
    it("Comprobar obtener partida", function () {
      var codigo = ju1.codigoPartida;
      expect(ju1.obtenerPartida(codigo)).toBeDefined();
    });

    it("Comprobar mazo", function () {
      expect(partida.mazo.length).toBe(32);
      /*var rojo=partida.mazo.filter(function(each){
            return each.color=="rojo";
          });
          expect(rojo.length).toBe(25);
          var verde=partida.mazo.filter(function(each){
            return each.color=="verde";
          });
          expect(verde.length).toBe(25);
          var amarillo=partida.mazo.filter(function(each){
            return each.color=="amarillo";
          });
          expect(amarillo.length).toBe(25);
          var azul=partida.mazo.filter(function(each){
            return each.color=="azul";
          });
          expect(azul.length).toBe(25);
          var mas4=partida.mazo.filter(function(each){
            return each.valor=="mas4";
          });
          expect(mas4.length).toBe(4);
          var comodin=partida.mazo.filter(function(each){
            return each.valor=="comodin";
          });
          expect(comodin.length).toBe(4);
          var comodin4=partida.mazo.filter(function(each){
            return each.valor=="comodin4";
          });
          expect(comodin4.length).toBe(4);*/
    });

    it("Comprobamos la partida para 2 jugadores", function () {
      expect(juego.numeroPartidas()).toEqual(1);
      expect(partida.codigo).toBeDefined();
      expect(partida.numeroJugadores()).toEqual(1);
      expect(juego.obtenerTodasPartidas().length).toEqual(1);
      expect(partida.fase.nombre).toBe("inicial");
    });

    it(" Pepe se une", function () {
      var j2 = juego.usuarios["Pepe"];
      j2.unirAPartida(partida.codigo);
      expect(partida.numeroJugadores()).toEqual(2);
      expect(partida.fase.nombre).toBe("jugando");
    });

    it(" Pepe se une y Juan intenta unirse pero no puede", function () {
      var j2 = juego.usuarios["Pepe"];
      var j3 = juego.usuarios["Juan"];

      j2.unirAPartida(partida.codigo);
      expect(partida.numeroJugadores()).toEqual(2);
      expect(partida.fase.nombre).toBe("jugando");

      //J3 se intenta añadir
      j3.unirAPartida(partida.codigo);
      //El nº de jugadores sigue siendo 2 porque no se ha unido y la fase sigue siendo jugando
      expect(partida.numeroJugadores()).toEqual(2);
      expect(partida.fase.nombre).toBe("jugando");
    });

    it("Condiciones iniciales de la partida Jugando", function () {
      var ju2 = juego.usuarios["Pepe"];
      ju2.unirAPartida(partida.codigo);
      ju1.manoInicial();
      ju2.manoInicial();
      expect(ju1.mano.length).toEqual(7);
      expect(ju2.mano.length).toEqual(7);
      expect(partida.turno.nick).toEqual("Ana");
      expect(partida.direccion.nombre).toEqual("Derecha");
      expect(partida.cartaActual).toBeDefined();
    });

    //Test para obtener partida y comprobar que el código partida esté definido
    it(" El código de partida del jugador está definido", function () {
      var codigo = ju1.codigoPartida;
      expect(ju1.obtenerPartida(codigo)).toBeDefined();
    });
    //Test para ver que la mano inicial tiene 7 cartas y que el mazo ha disminuído 7 cartas
    it(" La mano inicial tiene 7 cartas", function () {
      ju1.manoInicial();
      expect(ju1.mano.length).toBe(7);
    });

    describe("Ana crea una partida de 2 jugadores, Pepe se une, reparten cartas...", function () {
      var ju2;

      beforeEach(function () {
        ju2 = juego.usuarios["Pepe"];
        ju2.unirAPartida(partida.codigo);
        ju1.manoInicial();
        ju2.manoInicial();
      });

      it("Ana juega carta", function () {
        partida.cartaActual.color = ju1.mano[0].color;
        ju1.jugarCarta(0);
        expect(partida.turno.nick).toEqual("Pepe");
        ju2.pasarTurno();
        partida.cartaActual.color = ju1.mano[0].color;

        expect(partida.turno.nick).toEqual("Raul");
        ju1.jugarCarta(0);
        expect(partida.turno.nick).toEqual("Pepe");
        ju2.pasarTurno();
        expect(partida.turno.nick).toEqual("Ana");
        partida.cartaActual.color = ju1.mano[0].color;
        ju1.jugarCarta(0);
        ju2.pasarTurno();
        expect(partida.fase.nombre).toEqual("jugando");
      });

      it("Ana roba 1 carta", function () {
        expect(ju1.mano.length).toBe(7);
        ju1.robar(1);
        expect(ju1.mano.length).toBe(8);
      });
      it("Ana juega una carta Bloqueo, pepe pierde el turno", function () {
        var carta = ju1.mano[0];

        while (!carta || carta.tipo != "bloqueo") {
          carta = ju1.mano.find(function (el) {
            return el.tipo == "bloqueo";
          });
          ju1.robar(1);
        }
        expect(carta.tipo).toEqual("bloqueo");

        var ind = ju1.mano.indexOf(carta);
        expect(ju1.mano[ind].tipo).toEqual("bloqueo");
        partida.cartaActual.color = carta.color;
        expect(partida.turno.nick).toEqual(ju1.nick);
        ju1.jugarCarta(ind);
        expect(partida.cartaActual.tipo).toEqual("bloqueo");
        //expect(ju2.estado.tipo).toEqual("bloqueado");
      });
    });
  });
  describe("Ana crea una partida de 3 jugadores..", function () {
    var ju1;
    var partida;

    beforeEach(function () {
      //codigo para crear partida
      ju1 = juego.usuarios["Ana"];
      partida = ju1.crearPartida(3);
      ju2 = juego.usuarios["Pepe"];
      ju2.unirAPartida(partida.codigo);
      ju2.manoInicial();
      ju3 = juego.usuarios["Raul"];
      ju3.unirAPartida(partida.codigo);
      ju3.manoInicial();
    });

    it("condiciones iniciales", function () {
      expect(partida.mazo.length).toBe(22);

      var carta = ju1.mano[0];

      while (!carta || carta.tipo != "bloqueo") {
        carta = ju1.mano.find(function (el) {
          return el.tipo == "bloqueo";
        });
        ju1.robar(1);
      }
      expect(carta.tipo).toEqual("bloqueo");

      var ind = ju1.mano.indexOf(carta);
      expect(ju1.mano[ind].tipo).toEqual("bloqueo");
      partida.cartaActual.color = carta.color;
      expect(partida.turno.nick).toEqual(ju1.nick);
      ju1.jugarCarta(ind);
      expect(partida.cartaActual.tipo).toEqual("bloqueo");
      expect(partida.turno.nick).toEqual(ju3.nick);
      expect(ju2.estado.nombre).toEqual("normal");
    });
  });
});
