const express = require('express');
const router = express.Router();
//Our Models
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

// public profile
router.get('/profile/:id', function (req, res, next) {
  const id = req.params.id;

  User.findOne({ "_id" : id }, (err, user) => {
      if (err) {
          res.json(err);
      } else {
          res.status(200).json(user);
      }
  });
});

// public service
router.get('/public-service/:id', function (req, res, next) {
    const id = req.params.id;
  
    Service.find({ "user" : id }, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(user);
        }
    });
  });

// public section
router.get('/public-section/:id', function (req, res, next) {
    const id = req.params.id;

    Section.findOne({ "service" : id }, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(user);
        }
    });
});

module.exports = router;