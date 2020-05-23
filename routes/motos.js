const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/motos");

/**
 * Obteniendo las motos
 */
router.get("/motos", (req, res) => {
  _controlador.consultarMoto().then(respuestaDB => {
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
    _controlador.guardarmoto(moto).then(respuestaDB => {
      res.send({ok: true, mensaje: "moto guardado", info: moto});
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
      .eliminarmoto(id)
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "moto eliminado correctamente" });
      })
      .catch((error) => {
        res.send(" Ocurrió un error: "+ error);
      });
  });

/**
 * Modificar un moto
 */
router.put("/motos/:id", (req, res) => {
    let documento = req.params.id;
    let u = req.body;

    console.log(u);
    _controlador
      .modificarmoto(u, documento)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "El moto ha sido modificado correctamente", info: respuestaDB });
      })
      .catch((error) => {
        res.send(error);
      });
  });

module.exports = router;