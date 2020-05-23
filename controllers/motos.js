//importar el servicion de postgres
const servicioPg = require('../services/postgres')

/**
 * Validando la informacion del moto
 * @param {*} moto moto en forma de JSON
 */
let validarMoto = (moto) => {
    if (!moto) {
        throw {
            ok: false, mensaje: "La info del moto es obligatoria"
        }
    }

    if (!moto.placa) {
        throw {
            ok: false, mensaje: "la placa es obligatoria"
        }
    }

    if (!moto.estado) {
        throw {
            ok: false, mensaje: "el estado de la moto es obligatorio"
        }
    }

    if (!moto.clase) {
        throw {
            ok: false, mensaje: "La clase de la moto es obligatoria"
        }
    }

    if (!moto.marca) {
        throw {
            ok: false, mensaje: "La marca de la moto es obligatoria"
        }
    }

    if (!moto.modelo) {
        throw {
            ok: false, mensaje: "El modelo de la moto es obligatorio"
        }
    }

    if (!moto.color) {
        throw {
            ok: false, mensaje: "El clor de la moto es obligatorio"
        }
    }

    if (!moto.cilindraje) {
        throw {
            ok: false, mensaje: "El cilindraje es obligatorio"
        }
    }

    if (!moto.id_propietario) {
        throw {
            ok: false, mensaje: "El documento del propietario es obligatorio"
        }
    }

    if (!moto.nro_soat) {
        throw {
            ok: false, mensaje: "El numero de soat es obligatorio"
        }
    }

    if (!moto.vencimiento_soat) {
        throw {
            ok: false, mensaje: "la fecha de vencimiento del soat es obligatoria"
        }
    }

    if (!moto.nro_tecnomecanica) {
        throw {
            ok: false, mensaje: "El numero de la tecnomecánica es obligatorio"
        }
    }

    if (!moto.vencimiento_tecnomecanica) {
        throw {
            ok: false, mensaje: "La fecha de vencimiento de la tecnomecanica es obligatoria"
        }
    }
}

/**
 * Guardando el moto en la base de datos
 * @param {*} moto datos del moto en en forma de JSON
 */
let guardarMoto = async (moto)=> {
    try {
        let _servicio = new servicioPg()
        let sql = `INSERT INTO public.motos(
            placa, estado, clase, marca, modelo, color, cilindraje,
             id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica)
        VALUES (
            '${moto.placa}',
            '${moto.estado}',
            '${moto.clase}',
            '${moto.marca}',
            '${moto.modelo}',
            '${moto.color}',
            '${moto.cilindraje}',
            '${moto.id_propietario}',
            '${moto.nro_soat}',
            '${moto.vencimiento_soat}',
            '${moto.nro_tecnomecanica}',
            '${moto.vencimiento_tecnomecanica}'
            );`;
            
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }
}

/**
 * Consultando motos
 */
let consultarMotos = async () => {
    try {
        let _servicio = new servicioPg()
        let sql = `SELECT * from motos`;
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {

        throw{ok: false, err: error };
    }
}

/**
 * Eliminar un moto
 * @param {*} id el id de un moto
 */
let eliminarMoto = async (id) => {
    try {
      let _servicio = new servicioPg();
      let sql = `DELETE FROM public.motos WHERE placa ='${id}'`;
      let respuesta = await _servicio.ejecutarSql(sql);
      return respuesta;
    } catch (error) {
      throw { ok: false , err:error};
    }
  };

  let modificarMoto = async (moto, placa) => {
    if (moto.placa != placa) {
      throw {
        ok: false,
        mensaje: "la placa de la moto no corresponde a la enviada.",
      };
    }
    try{
        let _servicio = new servicioPg();
        let sql = `UPDATE public.motos
        SET 
        estado='${moto.estado}',
        clase='${moto.clase}',
        marca='${moto.marca}',
        modelo='${moto.modelo}',
        color='${moto.color}',
        cilindraje='${moto.cilindraje}',
        id_propietario='${moto.id_propietario}',
        nro_soat='${moto.nro_soat}',
        vencimiento_soat='${moto.vencimiento_soat}',
        nro_tecnomecanica='${moto.nro_tecnomecanica}',
        vencimiento_tecnomecanica='${moto.nro_tecnomecanica}'
        WHERE placa ='${placa}';`;
        console.log(sql);

        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;

    } catch(error) {
        throw{ok: false ,
        err: error}
    }
  };

//exportando metodos en forma de JSON
module.exports = {validarMoto, guardarMoto, consultarMotos, eliminarMoto, modificarMoto};