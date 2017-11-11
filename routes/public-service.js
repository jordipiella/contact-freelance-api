var express = require('express');
var router = express.Router();

//Our Models
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");


// public service
router.get('/public-service/:url', function (req, res, next) {
  const url = req.params.url;
  let serviceAll = {}
  

  Service.findOne({ 'url': url }, (err, service) => {
    if (!service) {
      res.status(404).json({ message: 'error' })
    } else {
      User.findById({ '_id': service.user }, (err, user) => {
        if (err) {
          res.status(404).json({ message: 'error' })
        } else {
          Section.find({ 'service': service._id }, (err, section) => {

            serviceAll = {
              services: service,
              user: user,
              section: section
            }
            if (err) {
              res.status(404).json({ message: 'error' })
            } else {
              res.status(200).json(serviceAll);
            }
          });
        }
        
      });
    }
    
    
  });
});

module.exports = router;