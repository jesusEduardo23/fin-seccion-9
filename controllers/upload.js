const path = require('path');
const fs =require('fs');

const cloudinary = require('cloudinary').v2
const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Producto,Usuario } = require("../models");





const cargarArchivos=async(req,res=response)=>{

   
    
    try {
        const nombre =  await subirArchivo(req.files,undefined,'imgs');
      
         res.json({nombre}); 
    } catch (msg) {
        res.status(400).json({
            msg
        });
    }

    
}
//actualizar imagen de forma local
const actualizarImagen=async(req,res=response)=>{
     
    const{coleccion,id}=req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`el usuario no existe con el id ${id}`})
            }
            
            break;
            case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`el producto no existe con el id ${id}`})
            }
            
            break;
    
        default:
            return res.status(500).json({msg:'se me olvido algo'})
           
    }

     //limpiar imagenes previas
     if(modelo.img){
       //hay que borrar la imagen del servidor
       const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img) 
            //verifica si la imagen existe
       if(fs.existsSync(pathImagen)){
          //elimina la imagen
        fs.unlinkSync(pathImagen)
       }

     }

    const nombre =  await subirArchivo(req.files,undefined,coleccion);
    modelo.img=nombre
        await modelo.save();
        

      res.json(
           modelo
      );
}
//actualizar o subir imagen a cloudary online
const actualizarImagenCloudary=async(req,res=response)=>{
     
    const{coleccion,id}=req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`el usuario no existe con el id ${id}`})
            }
            
            break;
            case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`el producto no existe con el id ${id}`})
            }
            
            break;
    
        default:
            return res.status(500).json({msg:'se me olvido algo'})
           
    }

     //limpiar imagenes previas
     if(modelo.img){
       //hay que borrar la imagen del servidor
       const nombreArr = modelo.img.split('/');
       const nombre=nombreArr[nombreArr.length - 1];
       const[id_publico]=nombre.split('.')
       cloudinary.uploader.destroy(id_publico);


     }

     const{tempFilePath}= req.files.archivo
    const {secure_url}=await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;

        await modelo.save();

    
        

      res.json(
          secure_url
      );
}
const mostrarImagen=async(req,res=response)=>{
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `el usuario no existe con el id ${id}` })
            }

            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `el producto no existe con el id ${id}` })
            }

            break;

        default:
            return res.status(500).json({ msg: 'se me olvido algo' })

    }

    //limpiar imagenes previas
    if (modelo.img) {
        //hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        //verifica si la imagen existe
        if (fs.existsSync(pathImagen)) {
            //elimina la imagen
          return  res.sendFile(pathImagen);
        }

    }

   
    const imagenDefecto = path.join(__dirname, '../assets/no-image.jpg')
         
    res.sendFile(imagenDefecto);

}


module.exports={

    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudary
}