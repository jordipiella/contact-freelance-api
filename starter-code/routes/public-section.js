var express = require('express');
var router = express.Router();

//Our Models
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

router.get('/public-section/:sectionId', function (req, res, next) {
  const id = req.params.sectionId;
  let sectionAll = {}

  Section.findOne({ '_id': id }, (err, section) => {
    User.findById({ '_id': section.user }, (err, user) => {
      Service.find({ '_id': section.service }, (err, service) => {
        console.log(service);
        
        sectionAll = {
          section: section,         
          user: user,
          services: service
        }
        if (err) {
          res.json(err);
        } else {
          res.status(200).json(sectionAll);
        }
      });
    });
  });
});





module.exports = router;