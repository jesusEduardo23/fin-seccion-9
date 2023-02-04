const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuarioGet = async(req, res=response)=> {

    // const{q,nombre='no name',apikey,page=1,limit}=req.query;
    //  const{id,nombre}= req.query;
    const query={estado:true}//condicion para filtrar
    const{limite=5,desde=0}=req.query;
    // const usuarios=await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

         const [total,usuarios] =await Promise.all([
          Usuario.countDocuments(query),
          Usuario.find(query).skip(Number(desde)).limit(Number(limite))
         ]);

    res.json({
        
        total,usuarios
    });
  };

  const usuarioPost=async(req, res)=> {
      
  

    const {nombre,password,correo,rol} = req.body;
     const usuario = new Usuario({nombre,correo,password,rol});  
     //verificar correo
       
     //encriptar la contraseña
       const salt = bcryptjs.genSaltSync();
       usuario.password= bcryptjs.hashSync(password, salt);

     //guardar en bd

    await usuario.save();
    res.json({
        msg:'post-controlador',
        usuario
    });
  }

  const usuarioPut=async(req, res=response)=> {
        const{id} =req.params;
         const{_id,password,google,correo,...resto}=req.body;
         if(password){
           //encriptar la contraseña
       const salt = bcryptjs.genSaltSync();
       resto.password= bcryptjs.hashSync(password, salt);
         }
       
          //actualizar
            const usuario = await Usuario.findByIdAndUpdate(id,resto);
    res.json({msg:'put-controlador',
                       usuario});

  }

  const usuarioDelete=async(req, res=response)=> {

    const{id}=req.params;
    

    //eliminar usuario fisicamente
    // const usuario =await Usuario.findByIdAndDelete(id);
    //cambiamos el estado del usuario
    
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    
    const usuarioAutenticado = req.usuario;
    
    

    res.json({
    usuario,
    usuarioAutenticado

    })
  }

  module.exports={
           
        usuarioGet,
        usuarioPost,
        usuarioPut,
        usuarioDelete

  }