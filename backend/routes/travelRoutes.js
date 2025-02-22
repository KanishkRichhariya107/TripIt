const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');

router.get('/signup', travelController.signup_get);
router.post('/signup', travelController.signup_post);
router.get('/login', travelController.login_get);
router.post('/login', travelController.login_post);

module.exports = router;
