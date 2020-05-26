const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/asignaciones");

/**
 * Obteniendo las asignaciones
 */
router.get("/asignaciones", (req, res) => {
  _controlador.consultarAsignaciones().then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "asignaciones consultados" });
    }).catch(error => {
      res.send(error);
    });
});

/**
 * Guardando una asignacion
 */
router.post("/asignaciones", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let asignacion = req.body;

    // Guardar el asignacion en base de datos
    _controlador.guardarAsignacion(asignacion).then(respuestaDB => {
      res.send({ok: true, mensaje: "asignacion guardada", info: asignacion});
    }).catch(error => {
      res.send(error.response);
    });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

/**
 * Eliminar una asignacion
 */
router.delete("/asignaciones/:placa/:id_mecanico/:fecha", (req, res) => {
  let p = req.params.placa;
  let id_mec = req.params.id_mecanico;
  let fe = req.params.fecha;
  let u = req.body;

  let asig = {
    placa: p,
    id_mecanico: id_mec,
    fecha : fe
  }
  console.log("asignacion desde routes delete: "+asig);
    _controlador
      .eliminarAsignacion(asig)
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "asignacion eliminada correctamente" });
      })
      .catch((error) => {
        res.send(" Ocurrió un error: "+ error);
      });
  });

/**
 * Modificar un asignacion
 */
router.put("/asignaciones/:placa/:id_mecanico/:fecha", (req, res) => {
    let placa = req.params.placa;
    let id_mecanico = req.params.id_mecanico;
    let fecha = req.params.fecha;
    let u = req.body;

    console.log(u);
    _controlador
      .modificarAsignacion(u, placa, id_mecanico, fecha)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "la asignacion ha sido modificado correctamente", info: respuestaDB });
      })
      .catch((error) => {
        res.send(error);
      });
  });

module.exports = router;