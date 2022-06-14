
function ControlWeb() {

  this.nick;

  this.limpiar=function(){
    //todos los remove
          $("#mNJ").remove();
          $("#mUP").remove();
          $("#btnUP").remove();
          $("#myCarousel").remove();
          $("#mTE").remove();
          $("#mCP").remove();
          $('#mPD').remove();
          $('#mNICK').remove();      
          $('#mLP').remove();
          $('#cM').remove();
          $('#mES').remove();
          $('#mM').remove();
          $('#mCA').remove();
          $('#mPT').remove();
          $('#LU').remove();
          $('#mLU').remove();
          $('#WelG').remove();
          $('#mR').remove();
          $('#mAP').remove();
          $('#mCS').remove();
          $('#mmT').remove();
          $('#mRC').remove();
          $('#mDP').remove();
          //$('#mM').remove();
          //$('#mCA').remove();
          $('mR').remove();
};
  this.comprobarUsuario=function(){
    if ($.cookie("nick")){
        iu.limpiar();
        ws.nick=$.cookie("nick");
        rest.obtenerListaPartidas();
        iu.mostrarHome({nick: ws.nick});
    }
    else{      
        iu.limpiar();        
        iu.mostrarInicial();        
    }

  };
  this.mostrarPortada = function(){
    var cadena = '<div id="myCarousel" class="carousel slide" data-ride="carousel">'
    cadena = '<!-- Indicators -->'
    cadena += '<ol class="carousel-indicators">'
    cadena += '  <li data-target="#myCarousel" data-slide-to="0" class="active"></li>'
    cadena += '  <li data-target="#myCarousel" data-slide-to="1"></li>'
    cadena += '  <li data-target="#myCarousel" data-slide-to="2"></li>'
    cadena += '</ol>'  
    cadena += '<!-- Wrapper for slides -->'
    cadena += '<div class="carousel-inner">'
    cadena += '  <div class="item active">'
    cadena += '    <center><img src="/cliente/img/Uno1.jpg" alt="Uno1" style="height:590px ;width:50%"></center>'
    cadena += '  </div>'  /*
    cadena += '  <div class="item active">'
    cadena += '    <center><img src="/cliente/img/Uno2.jpg" alt="Uno1" style="height:590px ;width:50%"></center>'
    cadena += '  </div>'
    cadena += '  <div class="item active">'
    cadena += '    <center><img src="/cliente/img/Uno3.jpg" alt="Uno1"style="height:590px ;width:50%"></center>'
    cadena += '  </div>'
    cadena += '</div>'
    cadena += '<!-- Left and right controls -->'
    cadena += '<a class="left carousel-control" href="#myCarousel" data-slide="prev">'
    cadena += '  <span class="glyphicon glyphicon-chevron-left"></span>'
    cadena += '  <span class="sr-only">Previous</span>'
    cadena += '</a>'
    cadena += '<a class="right carousel-control" href="#myCarousel" data-slide="next">'
    cadena += '  <span class="glyphicon glyphicon-chevron-right"></span>'
    cadena += '  <span class="sr-only">Next</span>'
    cadena += '</a>'*/
    cadena += '</div>'    
    cadena += '<br>'    
    cadena += '<div>'
    cadena += '<center><button type="button" id="btnE" class="btn btn-danger" style="font-size : 25px; height:50px;width:400px">Jugar</button></center>'
    cadena += '</div>'

    $("#myCarousel").append(cadena);
    $("#btnE").on("click", function(){
      $("#myCarousel").remove();
      $("#btnE").remove();
      iu.comprobarUsuario();
    })
  }
  this.mostrarInicial = function(){
    iu.mostrarLoginGoogle();
    iu.mostrarRegistroUsuario();
    
  }/*
  this.loginUsuario = function () {
    var cadena = '<div class="sketchy" id="LU"><label for="usr"><h5></h5>Iniciar sesión:</label>';
    cadena += '<form action="/action_page.php" class="was-validated">';
    cadena += '<div class="form-group">';
    cadena += '<input type="text" class="form-control" id="correo" placeholder="correo electrónico" name="uname" required>';
    cadena += '</div>';
    cadena += '<div class="form-group">';
    cadena += '<input type="password" class="form-control" id="clave" placeholder="contraseña" name="pswd" required>';   
    cadena += '</div>';
    cadena += '<center><button type="submit" id="btnLU" class="btn btn-primary">Entrar</button></center>';
    cadena += '</form></div>';

    
    $("#loginU").append(cadena);

    $("#btnLU").on("click", function () {
        
        correo = $('#correo').val();
        clave = $('#clave').val();
        if ((correo == "") || (clave == "")) {
            iu.mostrarModal("Introduce un correo electrónico y contraseña válidos.");
        }
        else {
            iu.limpiar();
            rest.loginUsuario(correo, clave);
        }
    });
  };*/
  this.mostrarRegistroUsuario = function () {
    var cadena = '<center><div class="sketchy" id="mLU" ><p style="font-family:Consolas; font-size:23px">Registrate aquí</p><button type="button" id="btnLU" class="btn btn-danger" style="font-size:20px">Regístrate</button></div></center>';

    $("#mostrarLoginU").append(cadena);

    $("#btnLU").on("click", function () {
        $("#RU").remove();
        $("#mLU").remove();
        iu.mostrarRegistro();
    });
  };
  this.mostrarRegistro=function(){
    $('#mR').remove();
    var cadena= '<div class="sketchy" id="mR"><lab for="usr" style="font-size:20px">Email:</label>';
    cadena += '<div class="form-group">';
    cadena += '<input type="text" class="form-control" id="usr" placeorder="Usuario" required>';  
    cadena += '</div>';
    cadena += '<label for="usr">Contraseña:</label>';    
    cadena += '<div class="form-group">';
    cadena += '<input type="text" class="form-control" id="pass" placeorder="Contraseña" required> <br>';
    cadena += '</div>';
    cadena += '<center><button type="button" id="btnMR" class="btn btn-primary" style="font-size: large">Registrar</button></center>'
    cadena += '</div>';
    $('#mostrarRegistro').append(cadena);

    $("#btnMR").on("click", function () {
      correo = $('#usr').val();
      clave = $('#pass').val();
      if ((correo == "") || (clave == "")) {
        alert('El usuario o la contraseña son incorrectos') ;
        //iu.mostrarModal("Introduce un correo electrónico y contraseña válidos.");
      }
      else {
          iu.limpiar();
          rest.registrarUsuario(correo,clave);
          //rest.agregarJugador(correo);
      }
  });

  };
  this.mostrarLoginGoogle = function () {

    var cadena =  '<div class="sketchy" id="WelG">';
    cadena +=  '<div id="mLG"><p style="color:#69aadb; font-family:Consolas; font-size:20px">Iniciar a través de google:</p>';
    cadena += '<a href="/auth/google" class="btn btn-primary mb-2 mr-sm-2">Acceso a Google</a>';
    cadena +='</div></div>';
    $("#loginGoogle").append(cadena);

    /*$("#btnAgregarJu").on("click", function () {
      var nick = $("#usr").val();
      //Comprobar que el nick no es vacío
      if(nick==""){
        iu.mostrarModal("Hay que intoducir un nick");
      }else{
        //document.getElementById("alertaBuenUsuario").style.display = "block";
        //$("#alertaBuenUsuario").style.display = "block";
        //$("#agregarJugador").append(cadena);
        $("#mAJ").remove();
        rest.agregarJugador(nick);
      
        //swal("Error", "Debes de añadir un nombre de usuario", "error");
      }
    });*/
  };
  this.mostrarCrearPartida = function (nick) {
    var nick = nick;
    var cadena = '<div id="mCP"><label for="usr">Numero de Jugadores: </label>';
    cadena += '<input type="text" class="form-control" id="usr">';
    cadena += '<br>';
    cadena += '<button type="button" id="btnCP" class="btn btn-primary">CrearPartida</button>' 
    cadena += "</div>";
    $("#crearPartida").append(cadena);
    $("#btnCP").on("click",function(){
      var numJug =$('#usr').val();
      if (2<=numJug && numJug<=10){
          $("#mNJ").remove();
          $("#mCP").remove();
          $('#mPD').remove();
          $('#mNICK').remove();          
          $("#mUP").remove();    
          iu.mostrarControl();
          iu.mostrarEsperando();
          iu.mostrarDatosPartida();            
          //rest.obtenerListaPartidas();
          ws.crearPartida(nick, numJug);
      }
      else{
          $("#mCP").remove();
          iu.mostrarModal("Introduce un valor entre 2 y 8");
          iu.mostrarCrearPartida(nick);
      }
    })
  };
  
  this.mostrarListaPartidas = function(){    
  }

  this.mostrarUnirAPartida= function(){
    var cadena = '<div id="mUP"><h5 id="texto2">Unir a partida</h5>';
        cadena +=  '<div id="mUP"><label for="code">Introduzca el código de la partida:</label></div>';
        cadena +=  '<div class="input-group mb-3"><input type="text" class="form-control" id="code"></input>';
        cadena +=  '<div class="input-group-append"><button type="button" id="btnUP" class="btn btn-primary">Unir</button></div>';
        cadena +=  '</div></div>';

        $("#unirAPartida").append(cadena);

        $("#btnUP").on("click", function () {
            //click en mostrarPartida
            var codigo = $('#code').val();
            console.log(codigo);
            if (codigo == "") {
                iu.mostrarModal('Necesita introducir el codigo de la partida');
            }
            else {
              $("#mCP").remove();
              $("#mUP").remove();
                iu.mostrarEsperando();
                //iu.mostrarDatosPartida();
                ws.unirAPartida(codigo, ws.nick);
            }
        });
  }
  
  
  this.mostrarPartidasDisponibles=function(lista){
    $('#mPD').remove();
    
    var cadena= '<div id="mPD"><label for="usr">Lista de Partidas:</label>';
    cadena+= '<div class="list-group">'

    for(i=0;i<lista.length;i++){
        var codigo=lista[i].codigo;
        var partida = lista[i];
        cadena += '<a href="#" class="list-group-item list-group-item-action" value="'+codigo+ '">'+codigo+'</a>'
    }
    cadena += ' </div> </div> <br>';

    $("#listaPartidas").append(cadena)

    $(".list-group a").click(function(){
        codigo=$(this).attr("value");
        var nick=ws.nick;
        console.log(codigo+" "+nick);
        if (codigo && nick){
            $('#mLP').remove();
            $('#mCP').remove();
            iu.mostrarEsperando();
            iu.mostrarDatosPartida(partida);
            ws.unirAPartida(codigo,nick);            
        }
    });

};
  

this.mostrarEsperando=function(){
  $('#mES').remove();
  var cadena = '<div id="mES" class="loading-wrapper d-flex justify-content-center">';
  cadena += '<div class="loading-bouncing "></div>';
  cadena += '</div>';
  $("#esperando").append(cadena);
};

this.quitarEsperando=function(){

};

this.mostrarHome=function(data){
    rest.obtenerListaPartidas();
    iu.mostrarControl();    
    iu.mostrarCrearPartida(ws.nick);    
    iu.mostrarUnirAPartida();    
    iu.mostrarCerrarSesion();
};

this.mostrarPartida = function (data) {
  iu.mostrarAbandonarPartida();
  iu.mostrarRobarCarta();
  iu.mostrarPasarTurno();
  iu.mostrarControl();
  //iu.mostrarCartaActual();
  //iu.mostrarMano();
};
this.unirPartidaPrivada=function(){

};

this.mostrarControl=function(){
    $('#mNICK').remove();
    var cadena='<div id="mNJ" class="sketchy">';
    cadena+='<div id="mNICK" ><center>'+ws.nick+'</center></div>';
    cadena += "</div></div>";
    $('#control').append(cadena);
};
this.mostrarAbandonarPartida = function(){
    var cadena ='<div id="mAP"><button type="button" id="btnAbandonar" class="btn btn-danger" >Abandonar partida</button></div>';

    $("#abandonarP").append(cadena);

    $("#btnAbandonar").on("click",function(){
      //ws.codigo = "";
      ws.abandonarPartida();
      //iu.limpiar();
      //iu.mostrarHome();
      //iu.mostrarModal("Has abandonado la partida y cerrado la sala.")
  });
};
  this.mostrarCerrarSesion = function(){
    var cadena = '<div id="mCS"><button type="button" id="btnCerrar" class="btn btn-danger">Cerrar Sesion</button></div>';

    $("#cerrarS").append(cadena);

    $("#btnCerrar").on("click",function(){
      ws.cerrarSesion();       
 });
  };

  this.mostrarModal=function(msg){
    //meter el mensaje del modal
    $('#cM').remove();
    var cadena="<p id='cM'>"+msg+"</p>";
    $('#contenidoModal').append(cadena);
    $('#miModal').modal('show');
  };
  this.mostrarPasarTurno = function () {
    var cadena = '<div id="mPT"><button type="button" id="btnPT" class="btn btn-warning">Pasar turno</button></div>';

    $("#pasarTurno").append(cadena);

    $("#btnPT").on("click", function () {
        ws.pasarTurno();
    })

  };
  this.mostrarMano=function(lista){
    $('#mM').remove();
      var cadena = '<div id="mM">';
      cadena += '<div class="card-group"> '
      for(i=0;i<lista.length;i++){
          
          cadena += '<div class="column" value="'+ i +'">';
          cadena+='<div class="card bg-light" style="width:200px">';
          cadena+='<div class="card-body text-center">';
          cadena+='<a href="#" class="list-group-item list-group-item-action">';
          cadena+='<img class="card-img-top" src="cliente/img/'+lista[i].nombre+'.png" alt="Card image">';
          cadena+='</a> <p class="card-text">'+lista[i].tipo+' '+lista[i].valor+' '+lista[i].color+'</p>';
          cadena+='</div></div></div>';
      }
      cadena+='</div></div>';
      $('#mMano').append(cadena);



      $(".column").click(function () {
      var number=-1;
      number = $(this).attr("value");
      if (number!=-1) {
      ws.jugarCarta(number);
      }
      })
  };
  this.mostrarTurno = function (nickT) {
    $("#mmT").remove();
    
    var cadena='<div id="mmT" class="sketchy">';
    cadena += '<div id="mT"><h6>Turno: </h6>' + nickT +'</div> </div>';

    $("#mostrarTurno").append(cadena);
  };
  this.mostrarAlertaUno = function (msg) {
    $("#mAU").remove();
    $("#mAC").remove();

    var cadena = '<div id="mAU" class="alert alert-primary alert-dismissible">';
    cadena = cadena + '<button type="button" class="close" data-dismiss="alert">&times;</button>';
    cadena = cadena + '<strong>Al jugador ' + msg + ' le queda solo una carta! </strong></div>';
    $("#alerta").append(cadena);
}
  this.mostrarCartaActual=function(carta){
    $('#mCA').remove();
    var cadena = '<div id="mCA" class="card-columns">';
    cadena+='<div class="card bg-light">';
    cadena+='<div class="card-body text-center">';
    cadena+='<img class="card-img-top" src="cliente/img/'+carta.nombre+'.png" alt="Card image">';
    cadena+='<p class="card-text">'+carta.tipo+' '+carta.valor+' '+carta.color+'</p>';
    cadena+='</div></div>';
    cadena+='</div>';
    $('#cActual').append(cadena);
  };
  this.mostrarRobarCarta = function () {
    var cadena = '<div id="mRC"><button type="button" id="btnRC" class="btn btn-danger">Robar</button>';

    $("#robarCarta").append(cadena);

    $("#btnRC").on("click", function () {
        ws.robarCarta(1);
    })

};
 
  this.mostrarDatosPartida=function(data){
    $('#mDP').remove();
    //var codigop = partida.codigo;
    var cadena = '<div id="mDP"><button type="button" id="btnMDP" class="btn btn-danger">Datos de Partida</button>';
    //Partida: " + data.codigo;
    cadena += "</div>";

    $('#datosPartida').append(cadena);
    
    $("#btnMDP").click(function () {
      ws.datosPartida();
      })
  };
  this.datosPartida=function(data){
    $('#mDP').remove();
    //var codigop = partida.codigo;
    var cadena = '<div id="mrDP"><p> A'+data.codigo+'<br>'+data.propietario+'</p>';
    //Partida: " + data.codigo;
    cadena += "</div>";
    $('#dPartida').append(cadena);
  };
}
