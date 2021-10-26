const Food = require('../models/food');
const mongoose = require('mongoose');
const router = require('../routes/food');


exports.food_get_all = (req,res,next)=>{
Food.find() 
.select('name price _id')
.exec()
.then(docs =>{
    const response = {
        count:docs.length,
        food: docs
    }
    
   // if(docs.length >= 0 ){
        res.status(200).json(response);
   // }
    //else{
        //res.status(404).json({
           // message:"No entires Found"
       // })
   // }
  //   res.status(200).json(docs)
})
.catch(err =>{
    console.log(err);
    res.status(500).json({
        error:err
    })
})
}

exports.food_post = (req,res,next)=>{
    const food = new Food(
        { _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
        } );
    food.save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
             createdProduct : result,
            message : "Food Item has been Added"
             })
        })
        .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}

exports.food_get_byid = (req,res,next)=>{
    const id = req.params.foodId;
    if(id.length === 24){
    Food.findById(req.params.foodId)
    .exec()
    .then(result =>{
        if(!result){
            return res.status(404).json({
                message:"Food Item not found"
            })
        }
        res.status(200).json({
            output : result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(200).json({
            messahe:err
        })
    })
} else {
    return res.status(200).json({
        message : "Invalid Id"
    })
}
}


exports.food_patch = (req,res,next)=>{ 
    const id = req.params.foodId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
     Food.update({_id: id},{$set:updateOps})
    .exec()
    .then(result =>{
       res.status(200).json({
            message:"Food data have been updated"
           });
       }) 
     
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

}

exports.food_delete = (req,res,next)=>{
    Food.remove({_id: req.params.foodId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"Food item has been Deleted",
           })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}
