function ClienteRest() {
  //var iu = new.ControlWeb();
  this.agregarJugador = function (nick) {
    $.getJSON("/agregarJugador/" + nick, function (data) {
      console.log(data);
      var nick = data.nick;
      if (nick != -1) {
        $.cookie("nick",data.nick);
        //rest.obtenerListaPartidas();
        //iu.mostrarCrearPartida(nick);
        iu.limpiar();
        iu.comprobarUsuario();
      } else {
        iu.mostrarModal("El nick: "+nick+" esta en uso");
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
  this.eliminarUsuario = function (clave) {
    var nick = $.cookie("nick");
    console.log("inicio de eliminacion de usuario");
    $.ajax({
        type: 'DELETE',
        url: '/eliminarUsuario/'+nick,
        data: { "clave": clave },
        success: function (data) {
            if (data.res == 1) {
                $.removeCookie("nick");
                iu.limpiar();
                iu.mostrarInicial();
            } else{
                iu.limpiar();
                iu.mostrarModal("no se pudo eliminar el usuario");
                iu.mostrarPerfil();
            }
        },
        //contentType:'application/json',
        dataType:'json',
    });
}
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
  this.jugarCarta = function (nick, numero) {
    $.getJSON("/jugarCarta/" + nick +"/"+ numero, function (data) {
        console.log(data);
    });
}

this.robar = function (nick, numero) {
    $.getJSON("/robar/" + nick +"/"+ numero, function (data) {
        console.log(data);
    });
}
this.pasarTurno = function () {
    $.getJSON("/pasarTurno", function (data) {
        console.log(data);
    });
}
this.abandonarPartida = function(nick){
    $.getJSON("/abandonarPartida/" + nick, function (data) {
        console.log(data);
    });
}
this.cerrarSesion = function () {
    $.getJSON("/cerrarSesion/", function (data) {
        console.log(data);
    });
}
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
