const tieneRol = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validarCampos');
const validarJWT  = require('../middlewares/validarJWT');




module.exports={

    ...tieneRol,
    ...validarCampos,
    ...validarJWT
}