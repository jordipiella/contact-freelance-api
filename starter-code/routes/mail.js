const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
const nodemailer = require("nodemailer");
// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

// Generate test SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
  
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: account.user, // generated ethereal user
              pass: account.pass  // generated ethereal password
          }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Fred Foo 👻" <pol89.gn@gmail.com>', // sender address
          to: 'pol89.gn@gmail.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
      };
  
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      });
  });


