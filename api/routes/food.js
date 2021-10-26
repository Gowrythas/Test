const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Food= require('../models/food');
const FoodController = require ('../controllers/food')


router.get('/',FoodController.food_get_all);
router.get('/:foodId',FoodController.food_get_byid)
router.post('/', FoodController.food_post);



router.patch('/:foodId',FoodController.food_patch) 
 




router.delete('/:foodId',FoodController.food_delete);

module.exports = router; 