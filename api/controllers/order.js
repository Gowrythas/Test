const Order = require('../models/order');
const Food = require('../models/food');
const mongoose = require('mongoose');

exports.orders_get_all =  (req, res, next) => {
    Order.find()
    .populate('orderFoods.food','name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
}

exports.orders_create_order = (req, res, next) => {
    const order = new Order({
        orderFoods:req.body.foods
    })
    order.save()
                .then(result => {
                console.log(result);
                res.status(201).json({
                   message:'Order stored'
             })
        })
        .catch(err=>{
             res.status(500).json({
                message: err
            });    
        })
  
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('orderFoods.food')
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            order: order
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
}

exports.orders_delete_order = (req, res, next) => {
    Order.deleteOne({_id: req.params.orderId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "Order deleted",
            request:{
                type: 'POST',
                url: 'http://localhost:3000/order',
                body: { foodId: 'ID', quantity: "Number"}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    
    });
    
}