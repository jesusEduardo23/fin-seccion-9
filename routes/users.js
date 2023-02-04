const {Router} = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/users');
const { RolValido, correoExiste,usuarioExiste } = require('../helpers/db-validators');

 const{
      validarCampos,
      validarJWT,
      tieneRol
 }=require('../middlewares/index');

// const { esAdminRol, tieneRol } = require('../middlewares/validar-roles');
// const { validarCampos } = require('../middlewares/validarCampos');
// const { validarJWT } = require('../middlewares/validarJWT');





const routes = Router();


routes.get('/', usuarioGet)

  routes.post('/',[
       check('nombre','el nombre es obligatorio').not().isEmpty(),
       check('password','el password no es valido debe contener 6 o mas letras').isLength({min:6}),
       check('correo','el correo no es valido').isEmail(),
       check('correo').custom(correoExiste),
        check('rol').custom(RolValido),

       validarCampos, 
  ],usuarioPost)

  routes.put('/:id',[
        check('id','debe ser un id valido').isMongoId(),
        check('id').custom(usuarioExiste),  
        check('rol').custom(RolValido),
        validarCampos,
  ],usuarioPut )
  
  routes.delete('/:id',[
         
        validarJWT,
      //   esAdminRol,
       tieneRol('ADMIN_ROL','USER_ROL'),
        check('id','debe ser un id valido').isMongoId(),
        check('id').custom(usuarioExiste),  
       
        validarCampos,
  ],usuarioDelete )


  module.exports=routes;