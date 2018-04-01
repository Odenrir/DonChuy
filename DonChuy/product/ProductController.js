// ProductController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Product = require('./Product');

// Add new product
router.post('/registerproduct', function (req, res) {
    var result = { success: true, error: 0, product: null }
    var status = 200;
    var exists = false;
    var error = false;
    Product.find({ name: req.body.name }, function (err, products) {
        if (err) {
            error = true;
            result.success = false;
            result.error = 1;
            status = 500;
            return res.status(status).send(result);
        }
        else if (products.length) {
            exists = true;
            result.success = false;
            result.error = 2; //product already exists
            return res.status(status).send(result);
        }
        else {
            Product.create({
                name: req.body.name,
                description: req.body.description,
                keywords: [],
                price: req.body.price,
                category: req.body.category,
                code: "",
                picture: req.body.picture
            },
                function (err, product) {
                    if (err) {
                        console.log(err);
                        status = 500;
                        result.error = 1;
                        result.success = false;
                    }
                    else {
                        result.product = product;
                    }
                    return res.status(status).send(result);
                });
        }

    });
});
// Get specific product or all products
router.post('/requestproduct', function (req, res) {
    var key = req.body.id;
    var status = 200;
    if (key) {
        Product.findById({ key }, function (err, document) {
            var result = { success: true, error: 0, product: null }
            if (err) {
                result.success = false;
                result.error = 1;
                status = 500;
            }
            if (document) {
                result.product = document;
            }
            else {
                result.success = false;
                result.error = 2; //the product is not in the db
            }
            res.status(status).send(result);
        });
    }
    else {
        Product.find({}, function (err, documents) {
            var result = { success: true, error: 0, products: null }
            if (err) {
                result.success = false;
                result.error = 1;
                status = 500;
            }
            if (documents) {
                result.products = documents;
            }
            else {
                result.success = false;
                result.error = 2; //There are not products
            }
            res.status(status).send(result);
        });
    }
});
module.exports = router;