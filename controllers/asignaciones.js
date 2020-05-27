//importar el servicion de postgres
const servicioPg = require('../services/postgres')

/**
 * Validando la informacion del asignacion
 * @param {*} asignacion asignacion en forma de JSON
 */
let validarAsignacion = (asignacion) => {
    if (!asignacion) {
        throw {
            ok: false, mensaje: "La info de la asignacion es obligatoria"
        }
    }

    if (!asignacion.id_mecanico) {
        throw {
            ok: false, mensaje: "El id del mecanico de la asignacion es obligatorio"
        }
    }

    if (!asignacion.placa) {
        throw {
            ok: false, mensaje: "La placa de la asignacion es obligatoria"
        }
    }
}

/**
 * Guardando el asignacion en la base de datos
 * @param {*} asignacion datos del asignacion en en forma de JSON
 */
let guardarAsignacion = async (asignacion)=> {
    try {
        let _servicio = new servicioPg()
        let sql = `INSERT INTO public.mantenimientos(
            id_mecanico, placa, fecha)
            VALUES (
            '${asignacion.id_mecanico}',
            '${asignacion.placa}',
            '${asignacion.fecha}'
            );`;
            
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }
}

/**
 * Consultando asignaciones
 */
let consultarAsignaciones = async () => {
    try {
        let _servicio = new servicioPg()
        let sql = `SELECT * from public.mantenimientos`;
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false, err: error };
    }
}

/**
 * Eliminar un asignacion
 * @param {*} asignacion una asignacion
 */
let eliminarAsignacion = async (asignacion) => {
    let id_mecanico = asignacion.id_mecanico;
    let placa = asignacion.placa;
    let fecha = asignacion.fecha;
    console.log("asignacion desde metodo controlador: " + asignacion.placa + " " + asignacion.id_mecanico + " " + asignacion.fecha); 

    try {
      let _servicio = new servicioPg();
      let sql = `DELETE FROM public.mantenimientos
       WHERE placa ='${asignacion.placa}' AND fecha = '${asignacion.fecha}' AND id_mecanico = '${asignacion.id_mecanico}'`;
       console.log(sql);
      let respuesta = await _servicio.ejecutarSql(sql);
      return respuesta;
    } catch (error) {
      throw { ok: false , err : error};
    }
  };

  let modificarAsignacion = async (asignacion, asignacion2) => {
    
    if (asignacion.placa != asignacion2.placa) {
      throw {
        ok: false,
        mensaje: "la placa de la asignacion no corresponde a la enviada.",
      };
    }
    if (asignacion.id_mecanico != asignacion2.id_mecanico) {
        throw {
        ok: false,
        mensaje: "el id del mecanico de la asignacion no corresponde a la enviada.",
        };
    }
    if (asignacion.fecha != asignacion2.fecha) {
        throw {
        ok: false,
        mensaje: "la fecha de la asignacion no corresponde a la enviada.",
        };
    } 
    try{
        let _servicio = new servicioPg();
        let sql = `UPDATE public.mantenimiento
        SET 
        placa='${asignacion2.placa}',
        id_mecanico='${asignacion2.id_mecanico}',
        fecha='${asignacion2.fecha}',
        trabajos_realizados='${asignacion2.trabajos_realizados}',
        horas_invertidas='${asignacion2.horas_invertidas}'
        WHERE placa ='${placa}';`;

        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;

    } catch(error) {
        throw{ok: false ,
        err: error}
    }
  };

//exportando metodos en forma de JSON
module.exports = {validarAsignacion, guardarAsignacion, consultarAsignaciones, eliminarAsignacion, modificarAsignacion};