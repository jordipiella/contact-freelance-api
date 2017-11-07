const express = require('express');
const router = express.Router();
//Our Models
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

// public profile
router.get('/public-profile/:url', function (req, res, next) {
  const url = req.params.url;

  User.findOne({ "url" : url }, (err, user) => {
      console.log('user db', user)
      if (err) {
          res.json(err);
      } else {
          res.status(200).json(user);
      }
  });
});

// public profile service and avoid the change of url on browser.
router.get('/public-profile-service/:id', function (req, res, next) {
    const id = req.params.id;

    Service.find({ "user" : id }, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(user);
        }
    });
  });




module.exports = router;