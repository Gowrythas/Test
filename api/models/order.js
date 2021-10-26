const mongoose = require('mongoose');
 
const foodQuantitySchema = mongoose.Schema({

    food:{type:mongoose.Schema.Types.ObjectId, ref:'Food',required : true},
    quantity:{type:Number,default:1}
})
const orderSchema = mongoose.Schema({
    orderFoods:[foodQuantitySchema],
    
    //_id: mongoose.Schema.Types.ObjectId,
    //_id: mongoose.Schema.Types.ObjectId,
   // food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    //quantity: { type: Number, default:1}
   
})

module.exports = mongoose.model('Order',orderSchema);




