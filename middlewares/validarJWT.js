const {request,response}= require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');





const validarJWT= async(req,res,next)=>{
  const token= req.header('x-token');

  if(!token){
       return res.status(401).json({
        msg:'no hay token en la peticion'
       });
  } 
try {
    
  const {uid} = await jwt.verify(token, process.env.SECRETOKEY);

  //leer usuario que le corresponde uid
  const usuario =await Usuario.findById(uid);

 req.usuario = usuario
  
        
   
   next();
} catch (error) {
    console.log(error);
}
}

module.exports={

    validarJWT
}

