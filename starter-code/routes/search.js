const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

router.get('/search-user/:query/:limit/:skip', function (req, res, next) {
    const query = req.params.query;
    const limit = Number(req.params.limit);
    const skip = Number(req.params.skip);
    User.find({ $or: [{ "name": { "$regex": query, "$options": "g, i" } }] }, (err, usersList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(usersList);
        }
    })
    .limit(limit)
    .skip(skip);
});

router.get('/search-service/:query/:limit/:skip', function (req, res, next) {
    const query = req.params.query;
    const limit = Number(req.params.limit);
    const skip = Number(req.params.skip);
    Service.find({ $or: [{ "name": { "$regex": query, "$options": "g, i" } }, { "description": { "$regex": query, "$options": "g" } }] }, (err, serviceList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(serviceList);
        }
    })
    .limit(limit)
    .skip(skip);
});

module.exports = router;
