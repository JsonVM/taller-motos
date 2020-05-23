const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/usuarios");

/**
 * Obteniendo los usuarios
 */
router.get("/usuarios", (req, res) => {
  _controlador.consultarUsuario().then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "usuarios consultados" });
    }).catch(error => {
      res.send(error);
    });
});

/**
 * Obteniendo rol de usuario
 */
router.get("/usuarios/rol/:id", (req, res) => {

  let id = req.params.id;
  _controlador.consultarRolusuario(id).then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "Rol de usuario consultado" });
    }).catch(error => {
      res.send(error);
    });
});

/**
 * Guardando una usuario
 */
router.post("/usuarios", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let usuario = req.body;

    // Guardar el usuario en base de datos
    _controlador.guardarUsuario(usuario).then(respuestaDB => {
      res.send({ok: true, mensaje: "usuario guardado", info: usuario});
    }).catch(error => {
      res.send(error.response);
    });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

/**
 * Eliminar un usuario
 */
router.delete("/usuarios/:id", (req, res) => {
    let id = req.params.id;
    _controlador
      .eliminarUsuario(id)
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "Usuario eliminado correctamente" });
      })
      .catch((error) => {
        res.send(" Ocurrió un error: "+ error);
      });
  });

/**
 * Modificar un usuario
 */
router.put("/usuarios/:id", (req, res) => {
    let documento = req.params.id;
    let u = req.body;

    console.log(u);
    _controlador
      .modificarUsuario(u, documento)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "El usuario ha sido modificado correctamente", info: respuestaDB });
      })
      .catch((error) => {
        res.send(error);
      });
  });

module.exports = router;