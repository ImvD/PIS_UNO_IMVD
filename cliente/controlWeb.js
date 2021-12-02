function ControlWeb() {
  this.mostrarAgregarJugador = function () {
    var cadena = '<div id="mAJ"><label for="usr">Nick:</label>';
    cadena += '<input type="text" class="form-control" id="usr" placeholder="Introduce tu nick" style="margin-bottom:10"></input>';
    cadena +=
      '<button type="button" id="btnAgregarJu"class="btn btn-primary" style="margin-bottom:10">Entrar</button>';
    cadena += "</div>";
    cadena +=
      '<div class="alert alert-success" id="alertaBuenUsuario" style="display: none">';
    cadena += "<strong>Success!</strong>";
    cadena += "</div>";
    $("#agregarJugador").append(cadena);

    $("#btnAgregarJu").on("click", function () {
      var nick = $("#usr").val();
      //Comprobar que el nick no es vacío
      
        //document.getElementById("alertaBuenUsuario").style.display = "block";
        //$("#alertaBuenUsuario").style.display = "block";
        //$("#agregarJugador").append(cadena);
        $("#mAJ").remove();
        rest.agregarJugador(nick);
      
        //swal("Error", "Debes de añadir un nombre de usuario", "error");
      
    });
  };
  this.mostrarCrearPartida = function (nick) {
    var nick = nick;
    var cadena = '<div id="mCP"><label for="usr">Nick:</label>';
    cadena += "</div>";
    $("#crearPartida").append(cadena);
  };
  
  this.mostrarListaPartidas = function(){
    $("#crearPartida").append(cadena);
    
  }

  /*  this.mostrarUnirAPartida
  
  */
}
