// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const jwtOptions = require('../config/jwtoptions');
const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        secure: true, 
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD_SMTP
        },
        tls: {
            rejectUnauthorized: false
        }
    });

module.exports = transporter;


