const express = require('express')
// require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('../database/config');

const fileUpload = require('express-fileupload');



class Server {


    constructor(){
        this.app = express(); 
        this.port =  process.env.PORT;

        this.Path={
            userPath:'/api/usuarios',
            authPath:'/api/auth',
            buscarPath:'/api/buscar',
            categoriaPath:'/api/categorias',
            productoPath:'/api/productos',
            cargaArchivoPath:'/api/upload'

        }
        
         
        //conexion a la base de datos
          this.conectarDB();
         //middlewares
         this.middlewares();

         //parseo o envio de informacion del body
         this.app.use(express.json());
        //rutas
        this.routes();

     }

     async conectarDB(){
     
        await dbConnection();
     }

     middlewares(){
          //cors
          this.app.use(cors());
        //   this.app.use(express.json());
          
          //Directorio público      
          this.app.use(express.static('public'));

          //carga de archivos
         this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
     }
    
    routes(){
      this.app.use(this.Path.userPath,require('../routes/users'));
      this.app.use(this.Path.authPath,require('../routes/auth'));
      this.app.use(this.Path.buscarPath,require('../routes/buscar'));
      this.app.use(this.Path.categoriaPath,require('../routes/categorias'));
      this.app.use(this.Path.productoPath,require('../routes/producto'));
      this.app.use(this.Path.cargaArchivoPath,require('../routes/upload'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en el puerto ',this.port);
        })

    }


}

module.exports= Server;