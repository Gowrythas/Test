const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');
const foodRoutes = require ('./api/routes/food');
const orderRoutes = require ('./api/routes/order');

mongoose.connect('mongodb+srv://Gowrythas:gowrythas18@yb.rgevo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),{
    useMongoClient: true
}

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Conten-Type, Accept, Authorization");
     if(req.method === 'OPTIONS') {
         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
         return res.status(200).json({});
     }
    next();
}) 

// routes which should be handle requests

app.use('/user', userRoutes);
app.use('/food',foodRoutes);
app.use('/order',orderRoutes);

// This is message when above two routes Doesn't work
app.use((req,res,next)=>{
    const error = new Error ('Not Found');
    error.status = 404;
    next(error);
})
//when our custom error doesn't work
app.use((error,req,res,next)=>{
    res.status (error.status||500);
    res.json({
        error:{
            message : error.message
        }
    })
})



    


module.exports = app;