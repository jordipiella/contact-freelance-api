const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
const arrayTags = require('../helpers/arrayTags');
const formatTags = require('../helpers/formatTags');
const upload = require('../config/multers3')

// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");

//All services
router.get('/services', function (req, res, next) {
    const id = req.params.id;
    Service.find({}, (err, services) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(services);
        }
    });
});

//Services from 1 user (:id-->user id)
router.get('/services/:id', function (req, res, next) {
    const id = req.params.id;
    Service.find({ "user": id }, (err, service) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(service);
        }
    });
});

router.get('/service/:id', function (req, res, next) {
    const id = req.params.id;
    Service.findById({ "_id": id }, (err, service) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(service);
        }
    });
});

router.post('/service', function (req, res, next) {
    Service.findOne({ "name": req.body.name }, "name", (err, name) => {
        if (name !== null) {
            res.status(400).json({ message: 'this name already exist, sorry bro' });
            return;
        }
        let tags = formatTags(req.body.tags);

        const newService = Service({
            name: req.body.name,
            description: req.body.description,
            tags: tags,
            user: req.body.user,
            url: req.body.url
        });

        newService.save((err, service) => {
            if (err) {
                return res.status(400).json({ message: err });
            } else {
                User.findById({ "_id": service.user }, (err, user) => {
                    if (err) {
                        return res.status(400).json({ message: err });
                    } else {
                        user.services.push(service._id);
                        user.save((user) => {
                            return res.status(200).json({ message: "ok", section: service });
                        });
                    }
                });
            }
        });
    });
});

router.post('/service/image/', upload.single('file'), function (req, res) {
    const id = req.params.id;
    Service.findOne({ "name": req.body.name }, "name", (err, name) => {
        if (name !== null) {
            res.status(400).json({ message: 'this name already exist, sorry bro' });
            return;
        }
        let obj = arrayTags(req.body.tags);

        let newService = Service({
            name: req.body.name,
            description: req.body.description,
            tags: obj,
            user: req.body.user,
            bigImage: req.file.location,
            url: req.body.url
        });

        newService.save((err, service) => {
            if (err) {
                return res.status(400).json({ message: err });
            } else {
                User.findById({ "_id": service.user }, (err, user) => {
                    if (err) {
                        return res.status(400).json({ message: err });
                    } else {
                        user.services.push(service._id);
                        user.save((user) => {
                            return res.status(200).json({ message: "ok", section: service });
                        });
                    }
                });
            }
        });
    });
});

router.put('/service/:id', function (req, res, next) {
    const id = req.params.id;
    let tags = formatTags(req.body.tags);

    const serviceUpdates = {
        name: req.body.name,
        description: req.body.description,
        tags: tags,
        user: req.body.user,
        url: req.body.url
    };
    Service.findByIdAndUpdate({ _id: id }, serviceUpdates, { new: true }, (err, service) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json({ message: "ok", service: service });
        }
    });
});
router.post('/service-update/image', upload.single('file'), function (req, res, next) {

    const id = req.body.id;
    console.log('in',req.body.tags)
    let tags = arrayTags(req.body.tags);
    console.log('out',tags)

    const serviceUpdates = {
        name: req.body.name,
        description: req.body.description,
        bigImage: req.file.location,
        tags: tags,
        user: req.body.user,
        url: req.body.url
    };

    Service.findByIdAndUpdate({ _id: id }, serviceUpdates, { new: true }, (err, service) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json({ message: "oky", service: service });
        }
    });
});

router.delete('/service/:id', function (req, res, next) {
    const id = req.params.id;
    console.log('params', id)
    Service.findByIdAndRemove({ _id: id }, (err, service) => {
        console.log('ok 1', id)
        if (err) {
            res.json(err);
        } else {
            Section.remove({"service": service.id}, (err, sections)=>{
                console.log('ok 2', id, service.id)
                if(err){
                    res.json(err);
                } else {
                    User.findOne({ "services": service.id }, (err, user) => {
                        console.log('ok 3', id, service.id)
                        if (err) {
                            res.json(err);
                        } else {
                            const indexService = user.services.indexOf(id);
                            if (indexService > -1) {
                                user.services.splice(indexService, 1);
                                user.save((user) => {
                                    res.status(200).json({ message: "deleted", service: service });
                                });
                            }
                        }

                    });

                }
            });
            
        }
    });
});

module.exports = router;