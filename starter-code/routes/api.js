var express = require('express');
var router = express.Router();
/* TOKEN */
router.get('/token', function (req, res, next) {
});
/* USERS*/
router.get('/user/:id', function (req, res, next) {
    // Phone.find({}, function (err, phoneList) {
    //     if (err) {
    //         res.json(err)
    //     } else {
    //         res.status(200).json(phoneList)
    //     }
    // })
});
router.post('/user', function (req, res, next) {
});
router.put('/user/:id', function (req, res, next) {
});
router.delete('/user/:id', function (req, res, next) {
});
/* SERVICES*/
router.get('/services/:id', function (req, res, next) {
});
router.post('/services', function (req, res, next) {
});
router.put('/services/:id', function (req, res, next) {
});
router.delete('/services/:id', function (req, res, next) {
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
router.get('/search/:query', function (req, res, next) {
});


module.exports = router;
