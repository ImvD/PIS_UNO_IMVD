
function Juego(){
    this.jugadores={};

    this.agregarJugador = function(nick){
        var jugador = new jugador(nick);
        this.jugadores[nick]=jugador;
    }

}

function Jugador(nick){
    this.nick=nick;
}

function Partida(nombre){
    this.nombre = nombre;
}

function Carta(color,tipo){
    this.color = color;
    this.tipo = tipo;
}