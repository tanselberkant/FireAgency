const nodemailer = require('nodemailer');
const Portfolio = require('../models/Portfolio');

exports.getIndexpage = async (req, res) => {
  console.log(req.session.userID);
  const portfolios = await Portfolio.find();
  res.status(200).render('index', {
    page_name: 'index',
    portfolios,
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getServicesPage = (req, res) => {
  res.status(200).render('services', {
    page_name: 'services',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1> Mail Details </h1>
    <ul>
      <li> Name : ${req.body.name} </li>
      <li> Email : ${req.body.email} </li>
    </ul>
    <h1> Message </h1>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'berkantostanselix@gmail.com', // generated ethereal user
        pass: 'ofscosrmiplszleu', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fire Agency🔥" <berkantostanselix@gmail.com>', // sender address
      to: 'tanselberkant@gmail.com', // list of receivers
      subject: 'Fire Agency🔥 | New Message', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash("success","We received your message successfully")
    return res.status(200).redirect('contact');

  } catch (error) {
    req.flash("error","Something bad happened!")
    return res.status(200).redirect('/contact');
  }
};
