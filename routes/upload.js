const {Router}= require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloudary } = require('../controllers/upload');
const { coleccionPermitidas } = require('../helpers/db-validators');
const { validarCampos,validarArchivoSubir } = require('../middlewares');





const router = Router();

router.post('/',validarArchivoSubir,cargarArchivos);


router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','Debe ser un id valido de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudary);



router.get('/:coleccion/:id',[
   
    check('id','Debe ser un id valido de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen);


module.exports=router;