const {Router} = require('express');
const { check } = require('express-validator');
const{login, googleSincIn} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
// const { validarJWT } = require('../middlewares/validarJWT');



const routes = Router();


routes.post('/login',[
    // validarJWT,
    check('correo','el correo es obligatorio').isEmail(),
    check('password','la contraseña es invalida').not().isEmpty(),
    validarCampos
], login);

// routes.post('/google',[
//     // validarJWT,
//     check('id_token','id_google es obligatorio').not().isEmpty(),
//     // check('password','la contraseña es invalida').not().isEmpty(),
//     validarCampos
// ], googleSincIn);


module.exports=routes;