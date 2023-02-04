const {Schema, model} = require('mongoose');


const usuarioSchema=Schema({
     nombre: {
            type:String,
            required : [true,'el usuario es requerido']


            },
     correo: {
        type:String,
        required : [true,'el correo es requerido']


 },
    password: {
      type:String,
      required : [true,'la contraseña es requerida']


},
    img: {
       type:String

},
    rol: {
       type:String,
       required : true,
       enum:['ADMIN_ROL','USER_ROL']


},
    estado: {
       type:Boolean,
       default:true

},
    google: {
       type:Boolean,
       default:false

}


});

usuarioSchema.methods.toJSON= function(){
       const{__v,password,_id,...usuario}=this.toObject();
       usuario.uid = _id
       return usuario;

}


module.exports= model('Usuario',usuarioSchema);