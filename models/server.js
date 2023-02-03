const express = require('express')
// require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {


    constructor(){
        this.app = express(); 
        this.port =  process.env.PORT;
        this.userPath='/api/usuarios';
         
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
          //Directorio público      
          this.app.use(express.static('public'));
     }
    
    routes(){
      this.app.use(this.userPath,require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en el puerto ',this.port);
        })

    }


}

module.exports= Server;