var mongo = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

function CAD() {
  this.resultadosCol = undefined;
  this.usuariosCol = undefined;

  this.encontrarTodosResultados = function (callback) {
    encontrarTodos(this.resultadosCol, callback);
  };

  this.encontrarResultadoCriterio = function (criterio, callback) {
    encontrarCriterio(this.resultadosCol, criterio, callback);
  };

  this.encontrarTodosUsuarios = function (callback) {
    encontrarTodos(this.usuariosCol, callback);
  };

  this.encontrarUsuarioCriterio = function (criterio, callback) {
    encontrarCriterio(this.usuariosCol, criterio, callback);
  };

  function encontrarCriterio(coleccion, criterio, callback) {
    coleccion.find(criterio).toArray(function (err, usr) {
      if (usr.length == 0) {
        callback(undefined);
      } else {
        callback(usr[0]);
      }
    });
  }

  function encontrarTodos(coleccion, callback) {
    coleccion.find().toArray(function (err, datos) {
      if (err) {
        callback([]);
      } else {
        callback(datos);
      }
    });
  }

  this.insertarResultado = function (resultado, callback) {
    insertar(this.resultadosCol, resultado, callback);
  };

  this.insertarUsuario = function (usuario, callback) {
    insertar(this.resultadosCol, usuario, callback);
  };

  function insertar(coleccion, objeto, callback) {
    coleccion.insertOne(objecto, function (err, result) {
      if (err) {
        console.log("No se ha podido insertar");
      } else {
        console.log("Nuevo elemento");
        callback(result);
      }
    });
  }

  this.conectar = function (callback) {
    var cad = this;

    mongo.connect(
      "mongodb+srv://patata:patata@cluster0.owuvz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      function (err, db) {
        if (err) {
          console.log("No se pudo conectar");
        } else {
          console.log("Conectado a MongoDB");
          cad.resultadosCol = db.db("Juego-Uno").collection("resultados");
          cad.usuariosCol = db.db("Juego-Uno").collection("usuarios");
        }
      }
    );
  };

  this.modificarColeccionUsuarios = function (usuario, callback) {
    modificarColeccion(this.usuariosCol, usuario, callback);
  };

  function modificarColeccion(coleccion, usr, callback) {
    coleccion.findOneAndUpdate(
      { _id: usr._id },
      { $set: usr },
      { upsert: false },
      function (err, result) {
        if (err) {
          console.log("No se pudo actualizar la colección (método genérico)");
        } else {
          console.log("Elemento actualizado");
          // console.log(result);
        }
        callback(result);
      }
    );
  }
  this.eliminarUsuario = function (uid, callback) {
    eliminar(this.usuariosCol, { _id: ObjectID(uid) }, callback);
  };

  function eliminar(coleccion, criterio, callback) {
    coleccion.deleteOne(criterio, function (err, result) {
      if (!err) {
        console.log("Elemento eliminado");
        callback(result);
      } else {
        callback({ res: 0 });
      }
    });
  }
}

module.exports.CAD = CAD;
