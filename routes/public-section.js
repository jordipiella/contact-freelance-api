var express = require('express');
var router = express.Router();

//Our Models
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

router.get('/public-section/:url', function (req, res, next) {
  const url = req.params.url;
  let sectionAll = {};
  Section.findOne({ 'url': url }, (err, section) => {
    if(!section){
      res.status(404).json({ message: 'error' });
    } else {
      User.findById({ '_id': section.user }, (err, user) => {
        if(err){
          res.status(404).json({ message: 'error' });
        } else {
          Service.find({ '_id': section.service }, (err, service) => {
            if (err) {
              res.status(404).json({ message: 'error' });
            } else {
              sectionAll = {
                section: section,         
                user: user,
                services: service
              }
              res.status(200).json(sectionAll);
            }
          });
        }
      });
    }    
  });
});
module.exports = router;