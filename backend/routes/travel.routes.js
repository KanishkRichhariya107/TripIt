const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');

// Render signup and login pages
router.get('/signup', travelController.signup_get);
router.get('/login', travelController.login_get);

// Handle signup and login form submissions
router.post('/signup', travelController.signup_post);
router.post('/login', travelController.login_post);

module.exports = router;
