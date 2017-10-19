const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
const upload = require('../config/multer');
const arrayTags = require('../helpers/arrayTags');
// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");


// Bcrypt let us encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* USERS*/
router.get('/users', function (req, res, next) {
    User.find({}, function (err, userList) {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(userList);
        }
    });
});

//user
router.get('/user/:id', function (req, res, next) {
    const id = req.params.id;

    User.findOne({ "_id": id }, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(user);
        }
    })
})

//edit user
router.put('/user/:id', function (req, res, next) {
    const id = req.params.id;
    
    const userToUpdate = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        city: req.body.city,
        country: req.body.country,
        klaim: req.body.klaim,
        tags: req.body.tags,
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        google: req.body.google,
        web: req.body.web,
        url: req.body.url
    };

    User.findByIdAndUpdate(id, userToUpdate, { new: true }, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "updated" });
        }
    });
});
//insert userImage
router.post('/user/edit/userImage/:id', upload.single('file'), function (req, res) {
    const id = req.params.id;
    const userToUpdate = {
        userImage: `/uploads/${req.file.filename}`
    };

    User.findByIdAndUpdate(id, userToUpdate, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "image updated" });
        }
    });
});
//insert bigImage
router.post('/user/edit/bigImage/:id', upload.single('file'), function (req, res) {
    const id = req.params.id;
    const userToUpdate = {
        bigImage: `/uploads/${req.file.filename}`
    };

    User.findByIdAndUpdate(id, userToUpdate, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "image big updated" });
        }
    });
});
//delete user
router.delete('/user/:id', function (req, res, next) {
    const id = req.params.id;

    User.findByIdAndRemove(id, function (err, user) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "delete", user: user });
        }
    });
});

module.exports = router;