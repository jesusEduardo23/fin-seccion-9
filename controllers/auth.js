const {response} = require('express');
const bcriptjs = require('bcryptjs');
const jwt=require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');




const login =async(req,res=response)=>{
        
         const{correo,password}=req.body;

         try {
                  //verificar correo
                  const usuario = await Usuario.findOne({correo});
                  if(!usuario){
                        return res.status(500).json({msg:'el usuario o password estan errados-correo'})
                  }
                 //verificar si el usuario esta activo
                 
                  if(!usuario.estado){
                        return res.status(500).json({msg:'el usuario o password estan errados-estado-false'})
                  }
                  //verificar contraseña
                  const passwordValido = bcriptjs.compareSync(password,usuario.password);
                  if(!passwordValido){
                        return res.status(500).json({msg:'el usuario o password estan errados-password'})
                  }
                  
                  //generar token
                  const token = await generarJWT(usuario.id)

            res.json({
                msg:'hola usuario',
                usuario,
                token
              });
         } catch (error) {
            console.log(error);
             res.status(500).json({

                msg:'contacte con el administrador'
            });
         }


      

}



module.exports={

    login
}