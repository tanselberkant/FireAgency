const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).render('login', {
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, success) => {
          if (success) {
            // User session
            req.session.userID = user._id;
            res.status(200).redirect('/');
          } else {
            // Your password is not correct
            res.status(400).redirect('/login');
          }
        });
      } else {
        // User is Not Exist!
        res.status(400).redirect('/login');
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logOutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    if (user.role === 'admin') {
      const portfolios = await Portfolio.find();
      res.status(200).render('dashboard', {
        page_name: 'dashboard',
        portfolios,
      });
    } else {
      res.status(400).redirect('/');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// Add Portfolio
exports.createPortfolio = async (req, res) => {
  // console.log(req.body);
  // console.log(req.files.image);
  try {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let myRandom = (Math.random() + 1).toString(36).substring(7);

    let portImage = req.files.image;
    let uploadPath =
      __dirname + '/../public/uploads/' + myRandom + portImage.name;

    portImage.mv(uploadPath, async () => {
      await Portfolio.create({
        ...req.body,
        image: '/uploads/' + myRandom + portImage.name,
      });
      res.status(201).redirect('/users/dashboard');
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// Delete Portfolio
exports.deletePortfolio = async (req, res) => {
  try {

    const portfolio = await Portfolio.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../public' + portfolio.image;
    fs.unlinkSync(deletedImage);
    await Portfolio.findByIdAndRemove(req.params.id);
    res.redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
