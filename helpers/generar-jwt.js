const jwt=require('jsonwebtoken');
const env= require('dotenv');




const generarJWT=async(uid='')=>{

return new Promise((resolve, reject) => {
    
  const payload = { uid };

  jwt.sign( payload,process.env.SECRETOKEY,
    {
        expiresIn:'4h'

},(err,token)=>{

     if(err){
        console.log(err);
        reject('no se puedo generar el token')
     }else{
        resolve(token);
     }
});

});



}


module.exports={
    generarJWT
}