
function Juego(){
    this.usuarios={};
    this.partidas={};

    this.agregarJugador = function(nick){
        if(!this.usuarios[nick]){
            var jugador = new Jugador(nick,this);            
            this.usuarios[nick]=jugador;
        
        }
    }
    this.crearPartida = function(nick,numJug){
        var codigo="-1";
        var jugador=this.usuarios[nick];
        //crear código único de partida (Función auxiliar, dado el abecedario te devuelva un código de 6 letras como una matrícula) para generar el código de la partida
        codigo = this.obtenerCodigo();
        //Si la partida existe, crea un nuevo código
        while(this.partidas[codigo]){
            codigo = this.obtenerCodigo();
        }        
        //crear instancia de partida
        var partida= new Partida(codigo,jugador,numJug);
        //asignarla al array asociativo (Colección)
        this.partidas[codigo]=partida;

        return partida;
    }
    this.unirAPartida = function(nick,codigo){
        if (this.partidas[codigo]){
            var jugador = this.usuarios[nick];
            this.partidas[codigo].unirAPartida(jugador)
        }
    }
    this.obtenerCodigo=function(){
        let cadena="ABCDEFGHIJKLMNOPQRSTUVXYZ";
        let letras=cadena.split('');
        let maxCadena=cadena.length;
        let codigo=[];
        for(i=0;i<6;i++){
            codigo.push(letras[randomInt(1,maxCadena)-1]);
        }
        return codigo.join('');
    }
    this.numeroPartidas = function(){
        return Object.keys(this.partidas).length;
    } 

}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}


function Jugador(nick, juego){
    this.nick=nick;
    this.juego= juego;
    //El jugador es el que crea la partida
    this.crearPartida=function(numJug){
        return this.juego.crearPartida(nick,numJug);
    }
    this.unirAPartida=function(codigo){
        this.juego.unirAPartida(nick,codigo);
    }
}

function Partida(codigo,jugador,numJug){
    this.codigo =codigo;
    this.propietario =jugador.nick;
    this.numJug =numJug;
    this.jugadores={};

    //Creamos la fase como Inicial
    this.fase = new Inicial();

    this.unirAPartida=function(jugador){
        this.fase.unirAPartida(this,jugador);
    }
    this.puedeUnirAPartida = function(jugador){
        this.jugadores[jugador.nick] = jugador;
    }
    

    //Función que devuelve el nº de jugadores de la partida
    this.numeroJugadores = function(){
        //Coge el nº de las claves del array asociativo (nick de Jugadores)  
        return Object.keys(this.jugadores).length;
    }

        //Siempre tiene que ser la última línea
    this.unirAPartida(jugador);
}

function Inicial(){
    this.nombre = "Inicial";
    this.unirAPartida = function ( partida,jugador){
        partida.puedeUnirAPartida(jugador);
        //Si numero de jugadores < numJug
        if(partida.numeroJugadores() == partida.numJug){ 
            partida.fase = new Jugando();
        }        
    }
}
function Jugando(){
    
    this.nombre = "Jugando";
    this.unirAPartida = function ( partida,jugador){
        console.log("La partida ya ha comenzado");
    }
}
function Final(){

    this.nombre = "Final";
    this.unirAPartida = function ( partida,jugador){
        console.log("La partida ya ha comenzado");
    }
    
}

function Carta(color,tipo){
    this.color = color;
    this.tipo = tipo;
}