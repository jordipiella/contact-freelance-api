const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtoptions');
// const upload = require('../config/multer');

const upload = require('../config/multers3')
const path = require('path');

const arrayTags = require('../helpers/arrayTags');
const formatTags = require('../helpers/formatTags');

// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");



router.get('/sections/:id', function (req, res, next) {
    const id = req.params.id;
    const p = req.params.p;
    Section.find({ "service": id }, (err, section) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(section);
        }
    })
    .limit(0)
    .skip(0);
});
router.get('/section/:id', function (req, res, next) {
    const id = req.params.id;
    Section.findOne({ "_id": id }, (err, section) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(section);
        }
    });
});

router.post('/section', function (req, res, next) {
    Section.findOne({ "name": req.body.name }, "name", (err, name) => {
        if (name !== null) {
            res.status(400).json({ message: 'this name already exist, sorry bro' });
            return;
        }
        let tags = formatTags(req.body.tags);

        const newSection = Section({
            name: req.body.name,
            description: req.body.description,
            tags: tags,
            portfolio: req.body.portfolio,
            user: req.body.user,
            service: req.body.service,
            bigImage: req.body.bigImage
        });

        newSection.save((err, section) => {
            console.log('section', section, section.user)
            if (err) {
                return res.status(400).json({ message: err });
            } else {
                User.findById({ "_id": section.user }, (err, user) => {
                    if (err) {
                        return res.status(400).json({ message: err });
                    } else {
                        user.sections.push(section._id);
                        user.save((user) => {
                            Service.findById({ "_id": section.service }, (err, service) => {
                                if (err) {
                                    res.status(400).json({ message: err });
                                } else {
                                    service.sections.push(section._id);
                                    service.save((service) => {
                                        return res.status(200).json({ message: "ok", section: section });
                                    })
                                }
                            });
                        });
                    }
                });
            }
        });
    });
});

router.post('/section/image', upload.single('file'), function (req, res, next) {
    Section.findOne({ "name": req.body.name }, "name", (err, name) => {
        if (name !== null) {
            res.status(400).json({ message: 'this name already exist, sorry bro' });
            return;
        }
        let tags = arrayTags(req.body.tags);

        const newSection = Section({
            name: req.body.name,
            description: req.body.description,
            tags: tags,
            bigImage: req.file.location,
            portfolio: req.body.portfolio,
            user: req.body.user,
            service: req.body.service,
            url: req.body.url
        })

        newSection.save((err, section) => {
            if (err) {
                return res.status(400).json({ message: err });
            } else {
                User.findById({ "_id": section.user }, (err, user) => {
                    if (err) {
                        return res.status(400).json({ message: err });
                    } else {
                        user.sections.push(section._id);
                        user.save((user) => {
                            Service.findById({ "_id": section.service }, (err, service) => {
                                if (err) {
                                    res.status(400).json({ message: err });
                                } else {
                                    service.sections.push(section._id);
                                    service.save((service) => {
                                        return res.status(200).json({ message: "ok", section: section });
                                    })
                                }
                            });
                        });
                    }
                });
            }
        });
    });
});

router.put('/section/:id', function (req, res, next) {
    const id = req.params.id;
    let tags = formatTags(req.body.tags);
    const sectionUpdates = {
        name: req.body.name,
        description: req.body.description,
        tags: tags,
        user: req.body.user
    };
    Section.findByIdAndUpdate({ _id: id }, sectionUpdates, { new: true }, (err, section) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json({ message: "ok", section: section });
        }
    });
});

router.post('/section-update/image', upload.single('file'), function (req, res, next) {
    const id = req.body.id;
    let tags = arrayTags(req.body.tags);

    const sectionUpdates = {
        name: req.body.name,
        description: req.body.description,
        bigImage: req.file.location,
        tags: tags,
        user: req.body.user,
        service: req.body.service
    };

    Section.findByIdAndUpdate({ _id: id }, sectionUpdates, { new: true }, (err, section) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json({ message: "oky", section: section });
        }
    });
});


router.delete('/section/:id', function (req, res, next) {
    const id = req.params.id;
    Section.findByIdAndRemove({ _id: id }, (err, section) => {
        if (err) {
            res.json(err);
        } else {
            User.findOne({ "sections": id }, (err, user) => {
                const indexSection = user.sections.indexOf(id);
                if (indexSection > -1) {
                    user.sections.splice(indexSection, 1);
                    user.save((user) => {
                        Service.findOne({ "sections": id }, (err, service) => {
                            if (err) {
                                res.status(400).json({ message: err })
                            } else {
                                const indexSections = service.sections.indexOf(id);
                                console.log(indexSections)
                                if (indexSections > -1) {
                                    service.sections.splice(indexSections, 1);
                                }
                                service.save((service) => {
                                    res.status(200).json({ message: "deleted", section: section });
                                });
                            }
                        })
                    });
                }
            });
        }
    });
});

module.exports = router;