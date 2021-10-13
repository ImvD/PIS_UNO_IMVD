
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
    this.obtenerTodasPartidas=function(){
        var lista = [];
        for(each in this.partidas){
            var partida = this.partidas[each];
            lista.push({propietario:partida.propietario.partida.search})
        }
        return lista;
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
    this.mano=[];
    this.codigoPartida;
    //El jugador es el que crea la partida
    this.crearPartida=function(numJug){
        return this.juego.crearPartida(nick,numJug);
    }
    this.unirAPartida=function(codigo){
        this.juego.unirAPartida(nick,codigo);
    }
    this.obtenerPartida=function(codigo){
        return this.juego.partidas[codigo];
    }
    this.manoInicial=function(){
        var partida = this.obtenerPartida(this.codigoPartida);
        this.mano = partida.dameCartas(7);
    }
    this.robar=function(num){
        var partida = this.obtenerPartida(this.codigoPartida);
        var robadas = partida.dameCartas(num);
        var tmp = this.mano ;
        this.mano=tmp.concat(robadas);
    }
    this.pasarTurno=function(){
        var partida = this.obtenerPartida(this.codigoPartida);
        partida.pasarTurno(this.nick);
    }
}

function Partida(codigo,jugador,numJug){
    this.codigo =codigo;
    this.propietario =jugador.nick;
    this.numJug =numJug;
    this.jugadores={};
    this.mazo = [];
    this.ordenTurno = {};

    //Creamos la fase como Inicial
    this.fase = new Inicial();

    this.unirAPartida=function(jugador){
        this.fase.unirAPartida(this,jugador);
    }
    this.puedeUnirAPartida = function(jugador){
        this.jugadores[jugador.nick] = jugador;
        jugador.codigoPartida = this.codigo;
        this.ordenTurno.push(jugador.nick);
    }
    

    //Función que devuelve el nº de jugadores de la partida
    this.numeroJugadores = function(){
        //Coge el nº de las claves del array asociativo (nick de Jugadores)  
        return Object.keys(this.jugadores).length;
    }
    this.crearMazo=function(){
        var colores=["rojo","azul","amarillo","verde"]

        for (i=0;i <colores.length;i++) {
            //Añadimos los 0
            this.mazo.push(new Numero(0,colores[i]));  
            //Añadimos el resto de números
            for (j=1;j <10;j++) {
                this.mazo.push(new Numero(j,colores[i]));         
                this.mazo.push(new Numero(j,colores[i]));                    
            }
            for(j=0;j<2;j++){
            //Añado los bloqueos, cambios  (2 por color)              
            this.mazo.push(new Bloqueo("bloqueo",colores[i]));            
            this.mazo.push(new Cambio("cambio",colores[i]));
            this.mazo.push(new Mas2("mas2",colores[i]));
            
            }
            //Añado el mas4, comodín y comodín4
            this.mazo.push(new Mas4("mas4"));            
            this.mazo.push(new Comodin("comodin"));
            this.mazo.push(new Comodin4("comodin4"));
        }    

    }
    this.pasarTurno=function(nickJugador){
        var nick=this.turno.nick;
        if(nick=nickJugador){
            var indice = this.ordenTurno.indexOF(nick);
            var siguiente=(indice+1)%(Object.keys(this.jugadores).length);
            this.turno=this.jugadores[this.ordenTurno[siguiente]];
        }
    }
    this.asignarUnacarta=function(){
        var longitudMazo = this.mazo.length;
                //Obtienes la longitud del mazo
        var aleatorio = Math.random() * (longitudMazo);
        var cartaretirada = this.mazo.splice(aleatorio,1);
        return cartaretirada[0];
    }
    this.dameCartas=function(num){
        var cartas=[];
        for (i = 0; i <num; i++) {
            cartas.push(this.asignarUnacarta());            
        }
        return cartas;
    }


        //Siempre tiene que ser la última línea
    this.crearMazo();
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

//Objetos del mazo
//Números
function Numero(valor,color){
    this.color = color;
    this.valor = valor;
}
//Bloqueos
function Bloqueo(valor,color){
    this.color = color;
    this.valor = valor;
}
//Cambio
function Cambio(valor,color){
    this.color = color;
    this.valor = valor;
}
//Mas2(Chupate)
function Mas2(valor,color){
    this.color = color;
    this.valor = valor;
}
//Mas4(Chupate)
function Mas4(valor){
    this.valor = valor;    
}
//Comodín
function Comodin(valor){
    this.valor = valor;    
}

//Comodín4

function Comodin4(valor){
    this.valor = valor;    
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
module.exports.Juego=Juego;