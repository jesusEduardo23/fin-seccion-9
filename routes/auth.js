const {Router} = require('express');
const { check } = require('express-validator');
const{login} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');



const routes = Router();


routes.post('/login',[
    // validarJWT,
    check('correo','el correo es obligatorio').isEmail(),
    check('password','la contraseña es invalida').not().isEmpty(),
    validarCampos
], login);




module.exports=routes;