const {response, json} = require('express');
const bcriptjs = require('bcryptjs');
const jwt=require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
// const { googleVirify } = require('../helpers/google-verify');




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


// const googleSincIn=async(req,res=response)=>{

//       const {id_token} = req.body;
       
//    try {

//       const {nombre,correo,img}= await googleVirify(id_token);
      
//        let usuario= await Usuario.findOne(correo);
//             console.log(nombre,correo,img);
//       if(!usuario){
//             //si usuario no existe tengo que crearlo
//             const data={

//                   nombre,
//                   correo,
//                   password:'op',
//                   img,
//                   google:true
//             };

//             usuario = new Usuario(data);

//             await usuario.save();

//       }


//       if(!usuario.estado){
//                 return res.status(401).json({
//                   msg:'usuario bloqueado, hable con el administrador'
//                 });

//       }
      
//       //generar token
//       const token = await generarJWT(usuario.id)


      
//       res.json({
//             msg:'todo ok',
          
//              usuarioGoogle,
//              token
            
         
   
//          });
//    } catch (error) {
//       res.status(400).json({
//           msg:'el token no se puedo verificar'
//       //     msg:'token false'

//       });
//    }


     

// }



module.exports={

    login
//     googleSincIn
}