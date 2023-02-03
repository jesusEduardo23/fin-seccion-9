const Rol = require('../models/role');
const Usuario =require('../models/usuario');



const RolValido= async(rol='')=>{
    const existeRol = await Rol.findOne({rol});
    if(!existeRol){
     throw new Error('el rol no existe'); 
    }

 }

 const correoExiste=async(correo='')=>{
    const existeMail = await Usuario.findOne({correo});
       if(existeMail){
        throw new Error('el correo ya esta registrado '); 
       }

 }

 const usuarioExiste=async(id)=>{
    const existeUsuario = await Usuario.findById(id);
       if(!existeUsuario){
        throw new Error('el id no existe '); 
       }

 }

 module.exports ={
     RolValido,
     correoExiste,
     usuarioExiste

 }