const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
const nodemailer = require("nodemailer");
const transporter = require('../config/nodemailer');

const Contact = require("../models/contact");

router.post('/send', function (req, res, next) {
    const newContact = Contact({
        name : req.body.name,
        tel : req.body.tel,
        email : req.body.email,
        userEmail : req.body.userEmail,
        message : req.body.message,
        origin : req.body.origin,
        user : req.body.user,
        service : req.body.service,
        section : req.body.section,
    });
    
    newContact.save((err, contact)=>{
        if(err){
            res.status(400).json({ message : err });
        } else {
            rejectUnauthorized: false
            let mailOptions = {
                from: 'info@contactfreelance.com',
                to: `${req.body.email}`,
                bcc: 'info@casamaka.com',
                subject: `Contact from contacT-Freelance: ${req.body.name} `, 
                html: `${req.body.message}<br>` //We can create template
            };
            console.log('mail',mailOptions)

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                    res.status(400).json({ message : error })
                } else {
                    res.status(200).json({ message: info.messageId, contact: newContact });
                }
            });
        }
    })
});

module.exports = router;