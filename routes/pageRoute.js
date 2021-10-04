const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexpage); //localhost:3000
router.route('/signup').get(redirectMiddleware, pageController.getRegisterPage); //localhost:3000/signup
router.route('/login').get(redirectMiddleware, pageController.getLoginPage); //localhost:3000/login
router.route('/services').get(pageController.getServicesPage); //localhost:3000/services
router.route('/contact').get(pageController.getContactPage);  //localhost:3000/contact
router.route('/contact').post(pageController.sendEmail);

module.exports = router;