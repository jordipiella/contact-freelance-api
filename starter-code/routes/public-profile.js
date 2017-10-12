var express = require('express');
var router = express.Router();

//Our Models
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

// public profile
router.get('/public-profile/:id', function (req, res, next) {
  const id = req.params.id;

  User.findOne({ "_id": id }, (err, user) => {
      if (err) {
          res.json(err)
      } else {
          res.status(200).json(user)
      }
  })
})

// public profile service and avoid the change of url on browser.
router.get('/public-profile-service/:id', function (req, res, next) {
    const id = req.params.id;
  
    Service.find({ "user": id }, (err, user) => {
        if (err) {
            res.json(err)
        } else {
            res.status(200).json(user)
        }
    })
  })

// public profile section
router.get('/public-profile-section/:id', function (req, res, next) {
    const id = req.params.id;

    Section.findOne({"service": id}, (err, user) => {
        if (err) {
            res.json(err)
        } else {
            res.status(200).json(user)
        }
    })
})



module.exports = router;