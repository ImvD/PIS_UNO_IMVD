function ControlWeb() {

  this.mostrarAgregarJugador = function () {
    var cadena = '<div id="mAJ"><label for="usr">Nick:</label>';
    cadena = cadena + '<input type="text" class="form-control" id="usr"></input>';
    cadena = cadena + '<button type="button" id="btnAgregarJu"class="btn btn-primary">Entrar</button>'
    cadena = cadena + '</div>';
    $("#agregarJugador").append(cadena);

    $("#btnAgregarJu").on("click",function(){
        var nick=$('#usr').val();        
        //Comprobar que el nick no es vacío
        if(nick == "" || nick == null ){
                //alert("Algo va mal");
                swal("Error", "Debes de añadir un nombre de usuario", "error");
        }else{
            $("#mAJ").remove();
            rest.agregarJugador(nick);
        }         
    });
  };
  
    this.mostrarCrearPartida= function(){
        var cadena = '<div id="mCP"><label for="usr">Nick:</label>';
        cadena =+ '</div>';
        $("#crearPartida").append(cadena);
    }
  /*  this.mostrarUnirAPartida
    this.mostrarListaPartidas
  
  */
}
