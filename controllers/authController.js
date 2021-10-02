const User = require('../models/User');
const bcrypt = require('bcrypt');

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
          }else {
            // Your password is not correct
            res.status(400).redirect('/login');
          }
        });
      } else {
        // User is Not Exist!
        res.status(400).redirect('/login')
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logOutUser = (req,res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
}

exports.getDashboardPage = async (req,res) => {
  res.status(200).render('dashboard', {
    page_name : 'dashboard'
  })
}