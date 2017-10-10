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

// Generate test SMTP Datos reales 
nodemailer.createTestAccount((err, account) => {
  
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: process.env.HOST,
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
              user: process.env.MAIL, 
              pass: process.env.PASSWORD_SMTP 
          },
          tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false
          }
      });

      // setup email data with unicode symbols // aquí construimos el email
      let mailOptions = {
          from: 'info@contactfreelance.com', // sender address
          to: 'jordipiella@gmail.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
      };
      // verify connection configuration // esto solo verifica se puede comentar
    //   transporter.verify(function (error, success) {
    //       if (error) {
    //           console.log(error);
    //       } else {
    //           console.log('Server is ready to take our messages');
    //       }
    //   });
      //esto envia el email  lo he comentado para que no envie cada vez que arranca un email
    //   transporter.sendMail(mailOptions, (error, info) => {
    //       if (error) {
    //           return console.log(error);
    //       }
    //       console.log('Message sent: %s', info.messageId);
    //       // Preview only available when sending through an Ethereal account
    //       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    //   });
  });


