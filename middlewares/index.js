const tieneRol = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validarCampos');
const validarJWT  = require('../middlewares/validarJWT');
const validarArchivoSubir = require('../middlewares/validar-archivo')




module.exports={

    ...tieneRol,
    ...validarCampos,
    ...validarJWT,
    ...validarArchivoSubir
}