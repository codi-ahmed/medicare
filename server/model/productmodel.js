const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
name:{
    type:String,
    required: true,
      maxlength: 50
},
type:{
    type:String,
    required:true
},
company:{
    type:String,
    required:true
},
size:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
quantity:{
    type:Number,
    required:true
}

});

const ProductModel = mongoose.model("Product" ,productSchema);
module.exports = ProductModel;