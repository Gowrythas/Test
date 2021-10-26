const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const bcrypt = require ('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');


router.get('/',(req,res,next)=>{
    User.find()
    .select('name _id address phonenumber password')
    .exec()
    .then(result =>{
        res.status(200).json({
            Count : result.length,
            Users : result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(401).json({
            error : err
        })
    })
})
router.post('/signup',(req,res,next)=>{
    User.find({phonenumber:req.body.phonenumber})
    .exec()
    .then(user => {
        if(user.length >= 1){
             return res.status(409).json({
                 message:"Already have an  account"
             })
        } else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                        });
                } else{ const user = new User({
                        _id : mongoose.Types.ObjectId(),
                        name:req.body.name,
                        phonenumber:req.body.phonenumber,
                        email : req.body.email,
                        password : hash,
                        address : req.body.address
                         });
                        user.save()
                        .then(result =>{
                            console.log(result);
                            res.status(200).json({
                                message : "User Created"
                            })
                        })
                        .catch(err =>{
                            res.status(500).json({
                                error:err
                            })
                        })
                }
            })
        }
    })
    
     
})

router.post('/login',(req,res,next)=>{
    User.find({phonenumber:req.body.phonenumber})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'Auth failed'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(error,result)=>{
           
             if(result){
               const token = jwt.sign({
                   phonenumber : user[0].phonenumber,
                   userId : user[0]._id
               },
               process.env.JWT_KEY,
               {
                   expiresIn:"1h"
               }
               );
               return res.status(200).json({
                   message:"Logged In",
                   token : token
               })
            }
            else{
                return res.status(401).json({
                    message:"Auth failed"
                });
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
})
})

  

router.delete("/:userId",(req,res,next)=>{
    User.deleteOne({_id:req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"user Deleted"
        })
    })
    .catch(err =>{
        res.status(404).json({
            error:err
        })
    })
})

module.exports = router;