var modelo = require("./modelo.js");
//Esjta función define la prueba
describe("El juego del UNO...", function() {
    var juego;
  
    beforeEach(function() {
      juego = new modelo.Juego();
      juego.agregarJugador("Juan");    
      juego.agregarJugador("Ana");    
      juego.agregarJugador("Pepe");
    });
    
    it("Condiciones iniciales", function(){    
      expect(juego.numeroPartidas()).toEqual(0); 
      expect(juego.obtenerTodasPartidas().length).toEqual(0);
    });
  
    describe("Ana crea una partida de 2 jugadores..", function() {
      var ju1;
      var partida;
    
      beforeEach(function() {
      //codigo para crear partida
        ju1 = juego.usuarios["Ana"];   
        partida = ju1.crearPartida(2); 
      });
    it("Comprobar obtener partida",function(){
        var codigo=ju1.codigoPartida;
        expect(ju1.obtenerPartida(codigo)).toBeDefined();
    });
    
    it("Comprobar mazo",function(){
      expect(partida.mazo.length).toBe(24);
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
  
    it("Comprobamos la partida para 2 jugadores", function() {
      expect(juego.numeroPartidas()).toEqual(1);    
      expect(partida.codigo).toBeDefined();
      expect(partida.numeroJugadores()).toEqual(1);    
      expect(partida.fase.nombre).toBe("Inicial");
    });
  
    it(" Pepe se une",function(){
      var j2 = juego.usuarios["Pepe"];           
      j2.unirAPartida(partida.codigo);    
      expect(partida.numeroJugadores()).toEqual(2);
      expect(partida.fase.nombre).toBe("Jugando");
       
      
    });
    it(" Pepe se une y Juan intenta unirse",function(){
      var j2 = juego.usuarios["Pepe"];       
      var j3 = juego.usuarios["Juan"];       
      
      j2.unirAPartida(partida.codigo);    
      expect(partida.numeroJugadores()).toEqual(2);
      expect(partida.fase.nombre).toBe("Jugando");
      
      //J3 se intenta añadir
      j3.unirAPartida(partida.codigo);
      //El nº de jugadores sigue siendo 2 porque no se ha unido y la fase sigue siendo jugando
      expect(partida.numeroJugadores()).toEqual(2);
      expect(partida.fase.nombre).toBe("Jugando");
  
    });
    
    it("Condiciones iniciales de la partida Jugando", function(){
      var ju2=juego.usuarios["pepe"];
      ju2.unirAPartida(partida.codigo);
      ju1.manoInicial();
      ju2.manoInicial();
      expect(ju1.mano.length).toEqual(7);
      expect(ju2.mano.length).toEqual(7);      
      expect(partida.turno.nick).toEqual("ana");
      expect(partida.direccion.nombre).toEqual("Derecha");
      expect(partida.turno.nick).toEqual("ana");
    });

    //Test para obtener partida y comprobar que el código partida esté definido
    it(" El código de partida del jugador está definido", function(){
      var codigo = ju1.codigoPartida
      expect(ju1.obtenerPartida(codigo)).toBeDefined();
    });
    //Test para ver que la mano inicial tiene 7 cartas y que el mazo ha disminuído 7 cartas
    it(" La mano inicial tiene 7 cartas", function(){
      ju1.manoInicial();
      expect(ju1.mano.length).toBe(7);
    });
  
  
  });
  });

  