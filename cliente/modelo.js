
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