var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtoptions');
// Our user model
const User = require("../models/user");

// Bcrypt let us encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
/* USERS*/
router.get('/users', function (req, res, next) {
    User.find({}, function (err, userList) {
        if (err) {
            res.json(err)
        } else {
            res.status(200).json(userList)
        }
    })
});

router.put('/user/:id', function (req, res, next) {
    var id = req.params.id;
    var salt = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(req.body.password, salt);
    var userToUpdate = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashPass,
        phone: req.body.phone,
        city: req.body.city,
        country: req.body.country,
        klaim: req.body.klaim,
        tags: req.body.tags,
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        google: req.body.google,
        web: req.body.web,
        userImage: req.body.userImage,
        bigImage: req.body.bigImage,
    }

    User.findByIdAndUpdate(id, userToUpdate, function (err) {
        if (err) {
            res.json(err)
        } else {
            res.json({ message: "updated" })
        }
    })
});
router.delete('/user/:id', function (req, res, next) {
    var id = req.params.id;
    

    User.findByIdAndRemove(id, function (err, user) {
        if (err) {
            res.json(err)
        } else {
            res.json({ message: "delete", user: user })
        }
    })
});
/* SERVICES*/
router.get('/services/:id', function (req, res, next) {
});
router.post('/services', function (req, res, next) {
});
router.put('/services/:id', function (req, res, next) {
});
router.delete('/services/:id', function (req, res, next) {
});
/* SECTION*/
router.get('/section/:id', function (req, res, next) {
});
router.post('/section', function (req, res, next) {
});
router.put('/section/:id', function (req, res, next) {
});
router.delete('/section/:id', function (req, res, next) {
});

/* SEARCH */
router.get('/freelance/:query', function (req, res, next) {
});
router.get('/services/:query', function (req, res, next) {
});


module.exports = router;
