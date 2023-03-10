const {Schema,model} = require('mongoose');


const categoriaSchema = Schema({
        
    nombre:{
        type:String,
        required:[true,'el nombre es obligatorio'],
        unique:true
    },

    estado:{
        type:Boolean,
        default:true,
        required:[true,'el nombre es obligatorio']
    },

    usuario:{
         type:Schema.Types.ObjectId,
         ref:'Usuario',
         required:[true,'el usuario es obligatorio']

    }

    
});
 categoriaSchema.methods.toJSON= function(){
    const{__v,estado,...data}=this.toObject();
    
    return data;

}

module.exports = model('Categoria',categoriaSchema);