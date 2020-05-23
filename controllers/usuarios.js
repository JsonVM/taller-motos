//importar el servicion de postgres
const servicioPg = require('../services/postgres')

/**
 * Validando la informacion del usuario
 * @param {*} usuario usuario en forma de JSON
 */
let validarUsuario = (usuario) => {
    if (!usuario) {
        throw {
            ok: false, mensaje: "La info del usuario es obligatoria"
        }
    }

    if (!usuario.tipo_documento) {
        throw {
            ok: false, mensaje: "El documento es obligatorio"
        }
    }

    if (!usuario.documento) {
        throw {
            ok: false, mensaje: "el documento es obligatorio"
        }
    }

    if (!usuario.nombre) {
        throw {
            ok: false, mensaje: "El nombre es obligatorio"
        }
    }

    if (!usuario.apellidos) {
        throw {
            ok: false, mensaje: "los apellidos son obligatorios"
        }
    }

    if (!usuario.celular) {
        throw {
            ok: false, mensaje: "El celular es obligatorio"
        }
    }

    if (!usuario.correo) {
        throw {
            ok: false, mensaje: "El correo es obligatorio"
        }
    }

    if (!usuario.clave) {
        throw {
            ok: false, mensaje: "La clave es obligatoria"
        }
    }
}

/**
 * Guardando el usuario en la base de datos
 * @param {*} usuario datos del usuario en en forma de JSON
 */
let guardarUsuario = async (usuario)=> {
    try {
        let _servicio = new servicioPg()
        let sql = `INSERT INTO public.usuarios(
            tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave)
        VALUES (
            '${usuario.tipo_documento}',
            '${usuario.documento}',
            '${usuario.nombre}',
            '${usuario.apellidos}',
            '${usuario.celular}',
            '${usuario.correo}',
            '${usuario.rol}',
            md5('${usuario.clave}')
            );`;
            
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }
}

//Consultando rol de usuario
let consultarRolusuario = async (id) => {
    try {
        let _servicio = new servicioPg()
        let sql = `SELECT rol from usuarios WHERE id = '${id}'`;
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false, err: error };
    }
}

/**
 * Consultando usuarios
 */
let consultarUsuario = async () => {
    try {
        let _servicio = new servicioPg()
        let sql = `SELECT * from usuarios`;
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {

        throw{ok: false, err: error };
    }
}

/**
 * Eliminar un usuario
 * @param {*} id el id de un usuario
 */
let eliminarUsuario = async (id) => {
    try {
      let _servicio = new servicioPg();
      let sql = `DELETE FROM public.usuarios WHERE documento ='${id}'`;
      let respuesta = await _servicio.ejecutarSql(sql);
      return respuesta;
    } catch (error) {
      throw { ok: false , err:error};
    }
  };

  let modificarUsuario = async (usuario, documento) => {
    if (usuario.documento != documento) {
      throw {
        ok: false,
        mensaje: "El documento del usuario no corresponde al enviado.",
      };
    }
    try{
        let _servicio = new servicioPg();
        let sql = `UPDATE public.usuarios
        SET tipo_documento='${usuario.tipo_documento}',
        documento='${usuario.documento}',
        nombre='${usuario.nombre}',
        apellidos='${usuario.apellidos}',
        celular='${usuario.celular}',
        correo='${usuario.correo}',
        rol='${usuario.rol}',
        clave=md5('${usuario.clave}')
        WHERE documento ='${documento}';`;

        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;

    } catch(error) {
        throw{ok: false ,
        err: error}
    }
  };

//exportando metodos en forma de JSON
module.exports = {validarUsuario, guardarUsuario, consultarRolusuario, consultarUsuario, eliminarUsuario, modificarUsuario};