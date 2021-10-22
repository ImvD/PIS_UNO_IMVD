function ClienteRest(){
    this.agregarJugador = function(nick){
        $.getJSON("/agregarJugador/"+nick,function(data){
                console.log(data);
        })        
    }
    this.crearPartida = function(nick,njug){
        $.getJSON("/crearPartida/"+nick+"/"+njug,function(data){
                console.log(data);
        })        
    }
    this.unirAPartida = function(nick,codigo){
        $.getJSON("/unirAPartida/"+nick+"/"+codigo,function(data){
                console.log(data);
        })        
    }
    this.obtenerListaPartidas = function(nick){
        $.getJSON("/obtenerListaPartidas/",function(data){
                console.log(data);
        })        
    }
}