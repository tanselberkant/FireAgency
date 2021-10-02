const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const ejs = require('ejs');
const pageRoute = require('./routes/pageRoute');
const userRoute = require('./routes/userRoute');

const app = express();

// Global Variable
global.userIN = null;

// Db Connection
mongoose
  .connect(
    'mongodb+srv://tansel:EaYeSA64CjdDOMaX@cluster0.fwtyd.mongodb.net/fireAgency-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Db Connected Successfully');
  })
  .catch((err) => {
    console.log(err);
  });

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'fire_nation_zuko',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://tansel:EaYeSA64CjdDOMaX@cluster0.fwtyd.mongodb.net/fireAgency-db?retryWrites=true&w=majority',
  })
}))

// ROUTES
app.use('*',(req,res,next) => {
  userIN = req.session.userID;
  next();
})
app.use('/', pageRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi`);
});
