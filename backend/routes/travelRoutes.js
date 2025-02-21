const express=require('express');
const router=express.Router();
const travelController = require('../controllers/travel.controller');


router.post('/', travelController.fetchTravelPackages);

module.exports=router;