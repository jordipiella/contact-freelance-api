const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
const upload = require('../config/multer');
const arrayTags = require('../helpers/arrayTags');
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
    Service.findOne({ "_id": id }, (err, service) => {
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

        const newService = Service({
            name: req.body.name,
            description: req.body.description,
            tags: req.body.tags,
            user: req.body.user
        });

        newService.save((err, service) => {
            if (err) {
                return res.status(400).json({ message: err });
            } else {
                return res.status(200).json({ message: "ok", service: service });
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
            bigImage: `/uploads/${req.file.filename}`
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
    const serviceUpdates = {
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        bigImage: req.body.bigImage,
        user: req.body.id
    };
    Service.findByIdAndUpdate({ _id: id }, serviceUpdates, { new: true }, (err, service) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json({ message: "ok", service: service });
        }
    });
});

router.delete('/service/:id', function (req, res, next) {
    const id = req.params.id;
    Service.findByIdAndRemove({ _id: id }, (err, service) => {
        if (err) {
            res.json(err);
        } else {
            User.findOne({ "services": service.id }, (err, user) => {
                const indexService = user.services.indexOf(id);
                if (indexService > -1) {
                    user.services.splice(indexService, 1);
                    user.save((user) => {
                        res.status(200).json({ message: "deleted", service: service });
                    });
                }
            });
        }
    });
});

module.exports = router;