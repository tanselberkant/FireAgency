const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.createUser); //localhost:3000/users/signup
router.route('/signin').post(authController.loginUser);
router.route('/logout').get(authController.logOutUser);
router.route('/dashboard').get(authController.getDashboardPage);


module.exports = router;
