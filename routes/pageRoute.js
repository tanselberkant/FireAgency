const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(pageController.getIndexpage); //localhost:3000
router.route('/signup').get(pageController.getRegisterPage); //localhost:3000/signup
router.route('/login').get(pageController.getLoginPage); //localhost:3000/login

module.exports = router;