const {response}= require('express');
const{ObjectId}= require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');


const coleccionPermitida=[
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscar=async(req,res=response)=>{

const{coleccion,termino}=req.params;


if(!coleccionPermitida.includes(coleccion)){
  
    return res.status(400).json({
        msg:`las colecciones permitidas son ${coleccionPermitida}`
    });

}


const buscarUsuario=async(termino='',res=response)=>{
         
  const esMongoId= ObjectId.isValid(termino);

  if(esMongoId){
    const usuario = await Usuario.findById(termino);
     return res.json({
        result:  (usuario) ? [usuario] :[]

    });
  }

   //buscar usuario por otros argumentos
   //expresion regular para buscar mayuscula o minusculas
   const regex= new RegExp(termino,'i');

   const usuarios = await Usuario.find({ //busqueda propia de mongodb //count tambien para contar
     $or:[{nombre:regex},{correo:regex}],//nombre es como aparece en el modelo
     $and:[{estado:true}]
    });

   res.json({
    result: usuarios

});

}


//buscar por categoria
const buscarCategoria=async(termino='',res=response)=>{
         
    const esMongoId= ObjectId.isValid(termino);
  
    if(esMongoId){
      const categoria = await Categoria.findById(termino);
       return res.json({
          result:  (categoria) ? [categoria] :[]
  
      });
    }
  
     //buscar usuario por otros argumentos
     //expresion regular para buscar mayuscula o minusculas
     const regex= new RegExp(termino,'i');
  
     const categoria = await Categoria.find({ //busqueda propia de mongodb //count tambien para contar
       $or:[{nombre:regex,estado:true}]//nombre es como aparece en el modelo
       
      });
  
     res.json({
      result: categoria
  
  });
  
  }

  //buscar productos

  const buscarProducto=async(termino='',res=response)=>{
         
    const esMongoId= ObjectId.isValid(termino);
  
    if(esMongoId){
      const producto = await Producto.findById(termino).populate('categoria','nombre');
       return res.json({
          result:  (producto) ? [producto] :[]
  
      });
    }
     


  
     //buscar usuario por otros argumentos
     //expresion regular para buscar mayuscula o minusculas
     const regex= new RegExp(termino,'i');
     
     
     const productos = await Producto.find({ //busqueda propia de mongodb //count tambien para contar
       $or:[{nombre:regex}],//nombre es como aparece en el modelo
       $and:[{estado:true}]
      }).populate('categoria','nombre');
  
     res.json({
      result: productos
  
  });
  
  }
 

  

//opciones
switch (coleccion) {
    case 'usuarios':
        buscarUsuario(termino,res)
        break;

    case 'categorias':
        buscarCategoria(termino,res)
        break;
    case 'productos':
          buscarProducto(termino,res)
          
        break;


    default:
         res.status(500).json({
            msg:'se me olvido hacer esta coleccion'
         });
        break;
}



}




module.exports={
    buscar
}