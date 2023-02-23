const path = require('path');
const { v4: uuidv4 } = require('uuid');





const subirArchivo = (files,extensionesValidas=['png','jpg','jpeg','git'],carpeta='')=>{

   return new Promise((resolve, reject) => {
    const{archivo} =files;

    const nombreCortado = archivo.name.split('.');
    const extension =nombreCortado[nombreCortado.length-1];
     
     //validar extension
     
     if(!extensionesValidas.includes(extension)){

        return reject(`la extension ${extension} no es permitida solo se permite ${extensionesValidas}`); 
        
     }


      const nomTemp= uuidv4()+ '.'+extension;

    //subida de imagen al servidor
   uploadPath =  path.join(__dirname , '../uploads/',carpeta , nomTemp);
 
   // Use the mv() method to place the file somewhere on your server
   archivo.mv(uploadPath,(err)=> {
     if (err){
         return  reject(err);  
     }
      
 
     resolve(nomTemp);
   });



    })


    
} 


module.exports={
    subirArchivo
}

