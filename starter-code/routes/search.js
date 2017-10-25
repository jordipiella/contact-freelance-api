const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

router.get('/search-user/:query', function (req, res, next) {
    const query = req.params.query;
    User.find({ $or: [{ "name": { "$regex": query, "$options": "g, i" } }] }, (err, usersList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(usersList);
        }
    })
    .limit(0)
    .skip(0);
});

router.get('/search-service/:query', function (req, res, next) {
    const query = req.params.query;
    Service.find({ $or: [{ "name": { "$regex": query, "$options": "g, i" } }, { "description": { "$regex": query, "$options": "g" } }] }, (err, serviceList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(serviceList);
        }
    });
});

router.get('/search-section/:query', function (req, res, next) {
    const query = req.params.query;
    Section.find({ $or: [{ "name": { "$regex": query, "$options": "g, i" } }, { "description": { "$regex": query, "$options": "g" } }] }, (err, sectionList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(sectionList);
        }
    });
});

module.exports = router;
