exports.getIndexpage = (req, res) => {
  console.log(req.session.userID)
  res.status(200).render('index', {
    page_name : 'index'
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register' , {
    page_name : 'register'
  });
};

exports.getLoginPage = (req,res) => {
  res.status(200).render('login', {
    page_name : 'login'
  });
}

exports.getServicesPage = (req,res) => {
  res.status(200).render('services', {
    page_name : 'services'
  });
}

exports.getContactPage = (req,res) => {
  res.status(200).render('contact', {
    page_name : 'contact'
  });
}