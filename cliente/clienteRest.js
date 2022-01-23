function ClienteRest() {
  //var iu = new.ControlWeb();
  this.agregarJugador = function (nick) {
    $.getJSON("/agregarJugador/" + nick, function (data) {
      console.log(data);
      var nick = data.nick;
      if (nick != -1) {
        $.cookie("nick",data.nick);
        rest.obtenerListaPartidas();
        iu.mostrarCrearPartida(nick);
      } else {
        iu.mostrarModal("El nick: "+nick+" esta en uso");
        iu.mostrarAgregarJugador();
      }
    });
    //Mostrar ruleta
  };

  this.registrarUsuario=function(email,clave){
    $.ajax({
        type:'POST',
        url:'/registrarUsuario',
        data:{"email":email,"clave":clave},
        success:function(data){
            if (data.email!="nook"){
                //mostrarLogin
                console.log(data.email);
                ws.nick=data.nick;
                rest.obtenerListaPartidas();
            }
            else{
                console.log("No se ha podido registrar")
            }
        },
        //contentType:'application/json',
        dataType:'json'
    });
  };

  this.loginUsuario=function(email,clave){
    $.ajax({
        type:'POST',
        url:'/registrarUsuario',
        data:{"email":email,"clave":clave},
        success:function(data){
            if (data.email!="nook"){
                //mostrarLogin
                console.log(data.email);
                ws.nick=data.nick;
                rest.obtenerListaPartidas();
            }
            else{
                iu.modal("Usuario o clave incorrecto")
            }
        },
        //contentType:'application/json',
        dataType:'json'
    });
  };
  this.crearPartida = function (nick, njug) {
    $.getJSON("/crearPartida/" + nick + "/" + njug, function (data) {
      console.log(data);
    });
    //mostrar una ruleta
  };
  this.unirAPartida = function (nick, codigo) {
    $.getJSON("/unirAPartida/" + nick + "/" + codigo, function (data) {
      console.log(data);
    });
  };
  this.obtenerListaPartidas = function () {
    $.getJSON("/obtenerListaPartidas/", function (data) {
      console.log(data);
      iu.mostrarPartidasDisponibles(data);
    });
  };
  this.obtenerListaPartidasDisponibles = function (nick) {
    $.getJSON("/obtenerListaPartidasDisponibles/", function (data) {
      console.log(data);
      iu.mostrarPartidasDisponibles(data);
    });
  };
  this.obtenerTodosResultados=function(){
		$.getJSON("/obtenerTodosResultados",function(data){
			console.log(data);
            //iu.mostrarListaResultados(data);
		})
	};

    this.obtenerResultados=function(nick){
		$.getJSON("/obtenerResultados/"+nick,function(data){
			console.log(data);
            //iu.mostrarListaResultados(data);
		})
	};
  //**********Prueba********** 
  this.obtenerDatosPartida=function(codigo){
    $.getJSON("/obtenerDatosPartida/"+codigo, function (data) {
      console.log(data);
      iu.mostrarDatosPartida(data);
    });
  }

}
