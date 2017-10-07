var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtoptions');
// Our user model
const User = require("../models/user");
const Service = require("../models/service");
const Section = require("../models/section");
const Contact = require("../models/contact");
const upload = require('../config/multer');
//const multer = require('multer');



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

//this was missing
// another modification 
//last
router.get('/user/:id', function (req, res, next) {
    const id = req.params.id;

    User.findOne({ "_id": id }, (err, user) => {
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
        web: req.body.web
    };

    User.findByIdAndUpdate(id, userToUpdate, { new: true }, function (err) {
        if (err) {
            res.json(err)
        } else {
            res.json({ message: "updated" })
        }
    });
});
router.post('/user/edit/:id', upload.array('file',2), function (req, res) {
    
    var id = req.params.id;
    //console.log(req.files[0].filename, req.files[1].filename)
    var userToUpdate = {
        userImage: `/uploads/${req.files[0].filename}`,
        bigImage: `/uploads/${req.files[0].filename}`,
    };

    User.findByIdAndUpdate(id, userToUpdate, function (err) {
        if (err) {
            console.log('errorrrrr')
            res.json(err)
        } else {
            res.json({ message: "image updated" })
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
    Service.findById({ "_id": id }, (err, service) => {
        if (err) {
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
            res.status(400).json({ message: 'this name already exist, sorry bro' });
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
    Service.findByIdAndUpdate({ _id: id }, serviceUpdates, {new:true}, (err, service) => {
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
            res.status(200).json({message: "deleted", service: service});
        }
    });
});

/* SECTION*/
router.get('/section/:id', function (req, res, next) {
    const id = req.params.id;
    Section.findById({ "_id": id }, (err, section) => {
        if (err) {
            res.json(err)
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
        const newSection = Section({
            name: req.body.name,
            description: req.body.description,
            tags: req.body.tags,
            bigImage: req.body.bigImage,
            portfolio: req.body.portfolio,
            user: req.body.id
        })

        newSection.save((err, section) => {
            if (err) {
                return res.status(400).json({ message: err });
            } else {
                return res.status(200).json({ message: "ok", section: section });
                // res.status(200).json(section);
            }
        })
    });
});

router.put('/section/:id', function (req, res, next) {
    const id = req.params.id;
    const sectionUpdates = {
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        bigImage: req.body.bigImage,
        portfolio: req.body.portfolio,
        user: req.body.id
    };
    Section.findByIdAndUpdate({ _id: id }, sectionUpdates, {new:true}, (err, section) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json({ message: "ok", section: section });
        }
    });
});

router.delete('/section/:id', function (req, res, next) {
    const id = req.params.id;
    Section.findByIdAndRemove({_id: id}, (err, section) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json({ message: "deleted", section: section });
        }
    });
});

/* CONTACT */
router.get('/contacts', function(req, res, next) {
    Contact.find({}, (err, contactList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(contactList)
        }
    });
});

router.get('/contact/:id', function(req, res, next) {
    const id = req.params.id;
    Contact.findById({"_id": id}, (err, contact) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(contact)
        }
    });
});

router.post('/contact', function(req, res, next) {
    const newContact = Contact({
        name: req.body.name,
        telf: req.body.telf,
        email: req.body.email, 
        message: req.body.message,
        user: req.body.id
    });

    newContact.save((err, contact) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            return res.status(200).json({ message: "ok", contact: contact });
        }
    });
});

router.delete('/contact/:id', function(req, res, next) {
    const id = req.params.id;
    Contact.findByIdAndRemove({"_id": id}, (err, contact) => {
        if (err) {
            res.status(err)
        } else {
            res.status(200).json({message: "deleted", contact})
        }
    });
})

/* SEARCH */
router.get('/freelance/:query', function (req, res, next) {
    const query = req.params.query;
    User.find({ $or: [{ "name": { "$regex": query, "$options": "g" } }] }, (err, usersList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(usersList)
        }
    });
});
router.get('/services/:query', function (req, res, next) {
    const query = req.params.query;
    Service.find({ $or: [{ "name": { "$regex": query, "$options": "g" } }, { "description": { "$regex": query, "$options": "g" } }] }, (err, serviceList) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(serviceList)
        }
    });
});

/* EMAIL SEND */


module.exports = router;
