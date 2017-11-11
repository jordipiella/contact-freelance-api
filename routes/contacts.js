const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

router.get('/contacts', function (req, res, next) {
    Contact.find({}, (err, contactList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(contactList);
        }
    });
});

router.get('/contact/:id', function (req, res, next) {
    const id = req.params.id;
    Contact.findById({ "_id": id }, (err, contact) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(contact);
        }
    });
});

router.post('/contact', function (req, res, next) {
    const newContact = Contact({
        name: req.body.name,
        telf: req.body.telf,
        email: req.body.email,
        message: req.body.message,
        user: req.body.id
    });

    newContact.save((err, contact) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            return res.status(200).json({ message: "ok", contact: contact });
        }
    });
});

router.delete('/contact/:id', function (req, res, next) {
    const id = req.params.id;
    Contact.findByIdAndRemove({ "_id": id }, (err, contact) => {
        if (err) {
            res.status(err);
        } else {
            res.status(200).json({ message: "deleted", contact });
        }
    });
})

module.exports = router;