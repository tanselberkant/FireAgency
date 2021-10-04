const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.createUser); //localhost:3000/users/signup
router.route('/signin').post(authController.loginUser);  //localhost:3000/users/signin
router.route('/logout').get(authController.logOutUser);  //localhost:3000/users/logout
router.route('/dashboard').get(authController.getDashboardPage);   //localhost:3000/users/dashboard
router.route('/dashboard').post(authController.createPortfolio);   //localhost:3000/users/dashboard
router.route('/dashboard/:id').delete(authController.deletePortfolio); //localhost:3000/users/dashboard/id
router.route('/dashboard/:id').put(authController.updatePortfolio);


module.exports = router;
