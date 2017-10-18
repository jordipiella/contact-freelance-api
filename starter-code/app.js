const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const nodemailer = require('./config/nodemailer');
const cors = require('cors')({ exposedHeaders: ['X-ResponseTime'] });

const index = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');


const users_api = require('./routes/users_api');
const mails = require('./routes/mails');
const search = require('./routes/search');
const contacts = require('./routes/contacts');
const services = require('./routes/services');
const sections = require('./routes/sections');
const publicProfile = require('./routes/public-profile');
const publicService = require('./routes/public-service');



require("dotenv").config();


if (process.env.NODE_ENV === 'development') {
  mongoose.connect(process.env.DATABASE);
} else {
  mongoose.connect(process.env.DATABASE);
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to ${process.env.DATABASE} database`));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors);
app.options('*', cors);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/doc', index);
app.use('/', auth);
app.use('/', publicProfile);
app.use('/', publicService);
app.use('/', mails);

//app.use('/api', api);

app.use('/api', passport.authenticate('jwt', { session: false }), users_api, search, contacts, services, sections);


//app.use('/users', users);
// app.use(function (req, res) {
//   res.sendfile(__dirname + '/public/index.html');
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
