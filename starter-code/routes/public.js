var express = require('express');
var router = express.Router();

//Our Models
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

router.get('/profile/:id', function (req, res, next) {
  const id = req.params.id;

  User.findOne({ "_id": id }, (err, user) => {
      if (err) {
          res.json(err)
      } else {
          res.status(200).json(user)
      }
  })
})

module.exports = router;