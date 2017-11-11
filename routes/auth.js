const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
const passport = require('../config/passport');
// Our user model
const User = require("../models/user");
// Bcrypt let us encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", function (req, res) {

    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
    }

    if (email === "" || password === "") {
        res.status(401).json({ message: "Fill up the fields" });
        return;
    }

    User.findOne({ "email": email }, (err, user) => {
        if (!user) {
            res.status(401).json({ message: "no such user found" });
        } else {
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (!isMatch) {
                    res.status(401).json({ message: "passwords did not match" });
                } else {
                    var payload = { id: user._id, email: user.email };
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.json({ message: "ok", token: token, user: user });
                }
            });
        }
    });
});

router.get("/token", passport.authenticate('jwt', { session: false }),(req, res, next) => {
    res.json({ ok: 'ok' });
});

router.post('/user', function (req, res, next) {
    User.findOne({ 'email': req.body.email }, "email", (err, user) => {
        if (user !== null) {
            res.status(400).json({ message: 'user exist' });
            return;
        }

        var salt = bcrypt.genSaltSync(bcryptSalt);
        var hashPass = bcrypt.hashSync(req.body.password, salt);

        var newUser = User({
            email: req.body.email,
            password: hashPass,
            name: req.body.name,
            surname: req.body.surname,
            url: req.body.url
        });

        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ message: err });
            } else {
                var payload = { id: user._id, email: user.email };
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                return res.status(200).json({ message: "ok", token: token, user: user });
            }
        });
    });
});

module.exports = router;