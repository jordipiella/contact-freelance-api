var express = require('express');
var router = express.Router();

//Our Models
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");


// public service
router.get('/public-service/:id', function (req, res, next) {
  const id = req.params.id;
  let serviceAll = {}

  Service.findOne({ '_id': id }, (err, service) => {
    User.findById({ '_id': service.user }, (err, user) => {
      Section.find({ 'service': service._id }, (err, section) => {
        console.log(section);
        
        serviceAll = {
          services: service,
          user: user,
          section: section
        }
        if (err) {
          res.json(err);
        } else {
          res.status(200).json(serviceAll);
        }
      });
    });
  });
});

// get id user from public service and avoid the change of url on browser.

// router.get('/public-service-user/:id', function (req, res, next) {
//   const id = req.params.id;

//   User.find({ 'services': id }, (err, user) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.status(200).json(user);
//     }
//   })
// })

// router.get('/public-service-section/:id', function (req, res, next) {
//   const id = req.params.id;

//   Section.findOne({ 'service': id }, (err, section) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.status(200).json(section);
//     }
//   })
// })



module.exports = router;