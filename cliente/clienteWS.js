function ClienteWS(){
    //Creo el socket
    this.socket;
    this.nick;
    this.codigo;
    this.conectar=function(){
        //Almaceno la conexión en el socket para poder arrancar en otro momento 
        this.socket = io(); 
        //Servidor WS del cliente
        this.servidorWSCliente();
    }
    this.crearPartida=function(nick,num){
        this.nick=nick;
        this.socket.emit("crearPartida",nick,num);
    }
    this.unirAPartida=function(nick,codigo){
        this.nick=nick;
        this.socket.emit("unirAPartida",nick,codigo);
    }
    this.manoInicial=function(){
        this.socket.emit("manoIncial",this.nick);
    }

    //Servidor WS del cliente
    this.servidorWSCliente=function(){
        var cli = this;
        this.socket.on("connect", function(){
            console.log("Conectado al servidor de WS");
        })
        //Entrada para la respuesta del WS
        this.socket.on("partidaCreada",function(data){
            console.log(data);
            cli.codigo = data.codigo;
        })
        this.socket.on("unidoAPartida",function(data){
            console.log(data);
            cli.codigo = data.codigo;
        })
        this.socket.on("pedirCartas",function(data){
            cli.manoInicial();
        })
        this.socket.on("mano",function(data){
            console.log(data);
            cli.metoca
        })
    }
    this.conectar();

}