const {Router} = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/users');
const { RolValido, correoExiste,usuarioExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');





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
    check('id','debe ser un id valido').isMongoId(),
        check('id').custom(usuarioExiste),  
       
        validarCampos,
  ],usuarioDelete )


  module.exports=routes;