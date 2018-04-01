// UserController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Register
router.post('/register', function (req, res) {
    var result = { success: true, error: 0, user: null }
    var status = 200;
    var exists = false;
    var error = false;
    User.findOne({ email: req.body.email }, function (err, document) {
        if (err) {
            error = true;
            result.success = false;
            result.error = 1;
            status = 500;
            return res.status(status).send(result);
        }
        else if (document) {
            exists = true;
            result.success = false;
            result.error = 2; //user already exists
            return res.status(status).send(result);
        }
        else {
            var pass = md5(req.body.password);
            var ageP = getAge(req.body.birthdate);

            User.create({
                name: req.body.name,
                lastname: req.body.lastname,
                title: req.body.title,
                email: req.body.email,
                password: pass,
                birthdate: req.body.birthdate,
                age: ageP,
                address: [],
                balance: 0,
                achievements: [],
                shopcart: [],
                defaultlist: [],
                usertype: req.body.usertype,
                rank: 0,
                store: -1,
                vehicle: -1,
                payment: -1,
                avaliable: false
            },
                function (err, doc) {
                    if (err) {
                        console.log(err);
                        status = 500;
                        result.error = 1;
                        result.success = false;
                    }
                    else {                        
                        result.user = doc;
                    }
                    return res.status(status).send(result);
                });
        }
        
    });
});
// Login
router.post('/login', function (req, res) {
    var pass = md5(req.body.password);
    var status = 200;
    User.findOne({ email: req.body.email, password: pass }, function (err, user) {
        var result = { success: true, error: 0, user: null }
        if (err) {
            result.success = false;
            result.error = 1;
            status = 500;
        }
        if (user) {
            result.user = user;
        }
        else {
            result.success = false;
            result.error = 2; //user is not registered
        }
        res.status(status).send(result);
    });
});
module.exports = router;