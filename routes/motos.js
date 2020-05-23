const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/motos");

/**
 * Obteniendo las motos
 */
router.get("/motos", (req, res) => {
  _controlador.consultarMotos().then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "motos consultados" });
    }).catch(error => {
      res.send(error);
    });
});

/**
 * Guardando una moto
 */
router.post("/motos", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let moto = req.body;

    // Guardar el moto en base de datos
    _controlador.guardarMoto(moto).then(respuestaDB => {
      res.send({ok: true, mensaje: "moto guardada", info: moto});
    }).catch(error => {
      res.send(error.response);
    });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

/**
 * Eliminar un moto
 */
router.delete("/motos/:id", (req, res) => {
    let id = req.params.id;
    _controlador
      .eliminarMoto(id)
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "moto eliminada correctamente" });
      })
      .catch((error) => {
        res.send(" Ocurrió un error: "+ error);
      });
  });

/**
 * Modificar un moto
 */
router.put("/motos/:id", (req, res) => {
    let placa = req.params.id;
    let u = req.body;

    console.log(u);
    _controlador
      .modificarMoto(u, placa)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "la moto ha sido modificado correctamente", info: respuestaDB });
      })
      .catch((error) => {
        res.send(error);
      });
  });

module.exports = router;