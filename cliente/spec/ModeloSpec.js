//Esjta función define la prueba
describe("El juego del UNO...", function() {
  var juego;

  beforeEach(function() {
    juego = new Juego();
    juego.agregarJugador("Juan");    
    juego.agregarJugador("Ana");    
    juego.agregarJugador("Pepe");


  });
  //Bloque de pruebas
  it("Ana crea una partida para 2 jugadores", function() {

    var j1 = juego.usuarios["Ana"];    
    expect(juego.numeroPartidas()).toEqual(0);
    var partida = j1.crearPartida(2);
    expect(juego.numeroPartidas()).toEqual(1);    
    expect(partida.codigo).toBeDefined();
    expect(partida.numeroJugadores()).toEqual(1);    
    expect(partida.fase.nombre).toBe("Inicial");
  });

  it("Ana crea una partida para 2 jugadores y Pepe se une",function(){
      
    var j1 = juego.usuarios["Ana"];   
    var j2 = juego.usuarios["Pepe"];       
    expect(juego.numeroPartidas()).toEqual(0); 

    var partida = j1.crearPartida(2);
    expect(partida.numeroJugadores()).toEqual(1);  
    
    j2.unirAPartida(partida.codigo);
    
    expect(partida.numeroJugadores()).toEqual(2);

    expect(partida.fase.nombre).toBe("Jugando");
     
    
  });
  it("Ana crea una partida para 2 jugadores, Pepe se une y Juan intenta unirse",function(){
      
    var j1 = juego.usuarios["Ana"];   
    var j2 = juego.usuarios["Pepe"];       
    var j3 = juego.usuarios["Juan"];       
    expect(juego.numeroPartidas()).toEqual(0); 

    var partida = j1.crearPartida(2);
    expect(partida.numeroJugadores()).toEqual(1);  
    
    j2.unirAPartida(partida.codigo);    
    expect(partida.numeroJugadores()).toEqual(2);
    expect(partida.fase.nombre).toBe("Jugando");
    
    //J3 se intenta añadir
    j3.unirAPartida(partida.codigo);
    //El nº de jugadores sigue siendo 2 porque no se ha unido y la fase sigue siendo jugando
    expect(partida.numeroJugadores()).toEqual(2);
    expect(partida.fase.nombre).toBe("Jugando");

  });
});
