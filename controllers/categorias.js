const { response, request } = require("express");
const {Categoria}=require('../models');




const obtenerCategorias = async(req,res=response)=>{

   const query = {estado:true}
   const{limite=5,desde=0}=req.query;

 
  const [total,categorias] =await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
    .populate('usuario','nombre')
    .skip(Number(desde))
    .limit(Number(limite))
   ]);

res.json({
  
  total,categorias
});
  

}


const obtenerCategoria=async(req, res=response)=>{

      const {id}=req.params;

      const categoria = await Categoria.findById(id).populate('usuario','nombre');

      res.json(categoria);
}




const crearCategoria = async(req,res=response)=>{

    const nombre = req.body.nombre.toUpperCase();
    const categoriaBd =await Categoria.findOne({nombre});

    if(categoriaBd){

        return res.status(400).json({
            msg:`la categoria ${nombre} ya existe en la base de datos`
        });
    }
   //generar la data y guardar ***parametros del modelo***
   const data={
     
       nombre,
       usuario:req.usuario._id
   }

   const categoria = new Categoria(data);

   //grabar en bd

  await categoria.save();
   
  res.status(201).json(categoria);

}


const actualizarCAtegoria = async (req,res=response)=>{

   const{id}=req.params;

   const {estado,usuario,...data}=req.body;

   data.nombre =data.nombre.toUpperCase();
   
    data.usuario = req.usuario._id;

   const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});

   res.json(categoria);

}

const categoriaDelete=async(req, res=response)=> {

    const{id}=req.params;
    

    //eliminar usuario fisicamente
    // const usuario =await Usuario.findByIdAndDelete(id);
    //cambiamos el estado del usuario
    
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})
    
    
    
    

    res.json({
     categoria
    

    })
  }








module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCAtegoria,
    categoriaDelete
}