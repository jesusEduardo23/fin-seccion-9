const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, productoDelete } = require('../controllers/producto');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');




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

//obtener productos
routes.get('/',obtenerProductos)

//obtener un producto por id
routes.get('/:id',[
         check('id','debe ser un id valido de mongo').isMongoId(),
         check('id').custom(existeProducto),
         validarCampos
],obtenerProducto)

//crear producto
routes.post('/',[
    validarJWT,
    check('nombre','El nombre de la categoria es obligatoria').not().isEmpty(),
    check('categoria','debe ser un id valido de mongo').isMongoId(),
    // check('categoria').custom(existeCategoria),
    validarCampos
  
  ], crearProducto)

//actualizar producto
routes.put('/:id',[
    validarJWT,
    check('id','debe ser un id valido de mongo').isMongoId(),
    // check('nombre','El nombre de la categoria es obligatoria').not().isEmpty(),
    check('id').custom(existeProducto),
    validarCampos

],actualizarProducto )

//eliminar categoria
routes.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id','debe ser un id valido de mongo').isMongoId(),
    validarCampos,
    check('id').custom(existeProducto),
    validarCampos

],productoDelete)



  module.exports=routes;