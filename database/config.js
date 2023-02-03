const mongoose = require('mongoose');




const dbConnection = async()=>{
    // console.log('base de datos online');
  
   try {
    mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.MONGO_CONECTION,{
         
         useNewUrlParser : true
        //  useUnifiedTopology:true
        // useCreateIndex: true,
        // useFindAndModify:false


       } )
 console.log('base de datos online');
    
   } catch (error) {
        console.log(error);
        throw new Error('no se logró iniciar la base de datos');

   }


}



module.exports={

       dbConnection

}