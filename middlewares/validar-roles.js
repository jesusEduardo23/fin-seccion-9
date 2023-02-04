const {response}= require('express')


const esAdminRol=(req,res=response,next)=>{


    if(!req.usuario ){

      res.status(500).json({
        msg:'se quiere validar el rol sin validar el token primero'
      })

    }

    const{rol,nombre}=req.usuario;

    if(rol!=='ADMIN_ROL'){

        return res.status(401).json({
            msg:`el usuario ${nombre} no es administrador`
        });
    }

     next();
}



const tieneRol=(...roles)=>{
  
    return (req,res=response,next)=>{
    
        if(!req.usuario ){

            res.status(500).json({
              msg:'se quiere validar el rol sin validar el token primero'
            })
      
          }
       
          if(!roles.includes(req.usuario.rol)){
                   return res.status(401).json({
                    msg: `el servicio requiere uno de estos roles ${roles}`
                   });

          }
          next();


    }

}



module.exports={
    esAdminRol,
    tieneRol
}