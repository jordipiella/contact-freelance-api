const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

router.get('/freelance/:query', function (req, res, next) {
    const query = req.params.query;
    User.find({ $or: [{ "name": { "$regex": query, "$options": "g" } }] }, (err, usersList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(usersList);
        }
    });
});

router.get('/servicesneedchange/:query', function (req, res, next) {
    const query = req.params.query;
    Service.find({ $or: [{ "name": { "$regex": query, "$options": "g" } }, { "description": { "$regex": query, "$options": "g" } }] }, (err, serviceList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(serviceList);
        }
    });
});

module.exports = router;
