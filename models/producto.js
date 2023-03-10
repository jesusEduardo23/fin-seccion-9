const {Schema,model} = require('mongoose');


const productoSchema = Schema({
        
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

    },
    
    precio:{
        type:Number,
        default:0
    },

    categoria:{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required:[true,'la categoria es obligatoria']
    },

    descripcion:{
               type:String,

    },
    img:{
        type:String,

     },
    disponible:{
               type:Boolean,
               default:true
    }

});
 productoSchema.methods.toJSON= function(){
    const{__v,estado,...data}=this.toObject();
    
    return data;

}

module.exports = model('Producto',productoSchema);