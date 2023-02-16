const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCAtegoria, categoriaDelete } = require('../controllers/categorias');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/users');
const { RolValido, correoExiste,usuarioExiste, existeCategoria, isAdminRol } = require('../helpers/db-validators');

 const{
      validarCampos,
      validarJWT,
      tieneRol,
      esAdminRol
 }=require('../middlewares/index');

// const { esAdminRol, tieneRol } = require('../middlewares/validar-roles');
// const { validarCampos } = require('../middlewares/validarCampos');
// const { validarJWT } = require('../middlewares/validarJWT');





const routes = Router();

//obtener todas las categorias
routes.get('/',obtenerCategorias)

//obtener una categoria por id
routes.get('/:id',[
         check('id','debe ser un id valido de mongo').isMongoId(),
         check('id').custom(existeCategoria),
         validarCampos
],obtenerCategoria)

//crear categoria
routes.post('/',[
    validarJWT,
    check('nombre','El nombre de la categoria es obligatoria').not().isEmpty(),
    validarCampos
  
  ], crearCategoria)

//actualizar categoria
routes.put('/:id',[
    validarJWT,
    check('id','debe ser un id valido de mongo').isMongoId(),
    check('nombre','El nombre de la categoria es obligatoria').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos

],actualizarCAtegoria )

//eliminar categoria
routes.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id','debe ser un id valido de mongo').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoria),
    validarCampos

],categoriaDelete)


routes.get('/', (req,res)=>{
    res.json('todo bien')
})
  module.exports=routes;