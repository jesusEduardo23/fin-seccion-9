const { response, request } = require("express");
const { Producto, Categoria }=require('../models');




const obtenerProductos = async(req,res=response)=>{

   const query = {estado:true}
   const{limite=5,desde=0}=req.query;

 
  const [total,productos] =await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
    .populate('usuario','nombre')
    .populate('categoria','nombre')
    .skip(Number(desde))
    .limit(Number(limite))
   ]);

res.json({
  
  total,productos
});
  

}


const obtenerProducto=async(req, res=response)=>{

      const {id}=req.params;

      const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');
     

      res.json(producto);
}




const crearProducto = async(req,res=response)=>{
    const{estado,usuario,...body}=req.body;
    // const nombre = req.body.nombre.toUpperCase();
    const productoBd =await Producto.findOne({nombre:body.nombre});
    
    

    if(productoBd){

        return res.status(400).json({
            msg:`la producto ${nombre} ya existe en la base de datos`
        });
    }


   //generar la data y guardar ***parametros del modelo***
   const data={
       ...body,
       nombre:body.nombre.toUpperCase(),
       usuario:req.usuario._id,
       
   }

   const producto = new Producto(data);

   //grabar en bd

  await producto.save();
   
  res.status(201).json(producto);

}


const actualizarProducto = async (req,res=response)=>{

   const{id}=req.params;

   const {estado,usuario,...data}=req.body;

   data.nombre =data.nombre.toUpperCase();
   
    data.usuario = req.usuario._id;

   const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

   res.json(producto);

}

const productoDelete=async(req, res=response)=> {

    const{id}=req.params;
    

    //eliminar usuario fisicamente
    // const usuario =await Usuario.findByIdAndDelete(id);
    //cambiamos el estado del usuario
    
    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
    
    
    
    

    res.json({
    producto
    

    })
  }








module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    productoDelete
}