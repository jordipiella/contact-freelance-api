var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtoptions');
// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");

// Bcrypt let us encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
/* USERS*/
router.get('/users', function (req, res, next) {
    User.find({}, function (err, userList) {
        if (err) {
            res.json(err)
        } else {
            res.status(200).json(userList)
        }
    });
});

router.get('/user/:id', function(req,res,next) {
    const id = req.params.id;

    User.findOne({"_id":id}, (err, user) =>{
        if (err) {
            res.json(err) 
        } else {
            res.status(200).json(user)
        }
    })
})

router.put('/user/:id', function (req, res, next) {
    var id = req.params.id;
    var salt = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(req.body.password, salt);
    var userToUpdate = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashPass,
        phone: req.body.phone,
        city: req.body.city,
        country: req.body.country,
        klaim: req.body.klaim,
        tags: req.body.tags,
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        google: req.body.google,
        web: req.body.web,
        userImage: req.body.userImage,
        bigImage: req.body.bigImage,
    };

    User.findByIdAndUpdate(id, userToUpdate, function (err) {
        if (err) {
            res.json(err)
        } else {
            res.json({ message: "updated" })
        }
    });
});
router.delete('/user/:id', function (req, res, next) {
    var id = req.params.id;
    

    User.findByIdAndRemove(id, function (err, user) {
        if (err) {
            res.json(err)
        } else {
            res.json({ message: "delete", user: user })
        }
    });
});
/* SERVICES*/
router.get('/service/:id', function (req, res, next) {
    const id = req.params.id;
    Service.findById({ "_id": id }, (err, service)=>{
        if(err){
            res.json(err)
        } else {
            res.status(200).json(service);
        }
    });
});
router.post('/service', function (req, res, next) {
    //ned create url
    Service.findOne({ "name": req.body.name }, "name", (err, name) => {
        if (name !== null) {
            res.status(400).json({ message: 'name exist sorry bro' });
            return;
        }

        var newService = Service({
            name: req.body.name,
            description: req.body.description,
            tags: req.body.tags,
            bigImage: req.body.bigImage,
            user: req.body.id
        });

        newService.save((err, service) => {
            if (err) {
                return res.status(400).json({ message: err });
            } else {
                return res.status(200).json({ message: "ok", service: service });
                // res.status(200).json(service);
            }
        });
    });
});
router.put('/service/:id', function (req, res, next) {
    const id = req.params.id;
    const serviceUpdates = {
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        bigImage: req.body.bigImage,
        user: req.body.id
    };
    Service.findByIdAndUpdate({_id: id}, {serviceUpdates}, (err, service)=>{
        if(err){
            res.json(err);
        } else {
            res.status(200).json(service);
        }
    });
});
router.delete('/service/:id', function (req, res, next) {
    const id = req.params.id;
    Service.findByIdAndRemove({_id: id},  (err, service)=>{
        if(err){
            res.json(err);
        } else {
            res.status(200).json(service);
        }
    })
});
/* SECTION*/
router.get('/section/:id', function (req, res, next) {
});
router.post('/section', function (req, res, next) {
});
router.put('/section/:id', function (req, res, next) {
});
router.delete('/section/:id', function (req, res, next) {
});

/* SEARCH */
router.get('/freelance/:query', function (req, res, next) {
    const query = req.params.query;
    User.find({$or:[{ "name": { "$regex": query, "$options": "g" }}]}, (err, usersList)=>{
        if(err){
            res.json(err);
        } else {
            res.status(200).json(usersList)
        } 
    });
});
router.get('/services/:query', function (req, res, next) {
    const query = req.params.query;
    Service.find({ $or: [{ "name": { "$regex": query, "$options": "g" } }, { "description": { "$regex": query, "$options": "g" } }]}, (err, serviceList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(serviceList)
        }
    });
});


module.exports = router;
