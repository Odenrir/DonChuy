import { react } from 'babel-types';

// UserShoppingController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// Add to defaultlist
router.post('/addtodefaultlist', function (req, res) {
    var result = { success: true, error: 0, user: null }
    var status = 200;
    User.findById({ req.body.id }, function (err, document) {
        if (err) {
            result.success = false;
            result.error = 1;
            status = 500;
            return res.status(status).send(result);
        }
        else if (document) {            
            var found = false;
            var i = 0;
            while (i < document.defaultlist.length && !found) {
                if (document.defaultlist[i].id == req.body.product) {
                    document.defaultlist[i].quantity += req.body.quantity;
                    if (document.deafaultlist[i].quantity <= 0) {
                        document.deafaultlist.splice(i, 1);
                    }
                    found = true;
                }
                i++;
            }            
            if (!found) {
                document.defaultlist.push({ id: req.body.product, quantity: req.body.quantity });
            }
            document.save(function (err, updatedDocument) {
                if (err) {
                    result.success = false;
                    result.error = 2; //error on update document
                    status = 500;
                }
                result.user = updatedDocument;
            });
        }
        else {
            result.success = false;
            result.error = 2; //user doesn't exist
            status = 500;
        }

    });
});
// Add to shopping cart
router.post('/addtocart', function (req, res) {
    var result = { success: true, error: 0, user: null }
    var status = 200;
    User.findById({ req.body.id }, function (err, document) {
        if (err) {
            result.success = false;
            result.error = 1;
            status = 500;
            return res.status(status).send(result);
        }
        else if (document) {
            var found = false;
            var i = 0;
            while (i < document.shoppingcart.length && !found) {
                if (document.shoppingcart[i].id == req.body.product) {
                    document.shoppingcart[i].quantity += req.body.quantity;
                    if (document.shoppingcart[i].quantity <= 0) {
                        document.shoppingcart.splice(i, 1);
                    }
                    found = true;
                }
                i++;
            }
            if (!found) {
                document.shoppingcart.push({ id: req.body.product, quantity: req.body.quantity });
            }
            document.save(function (err, updatedDocument) {
                if (err) {
                    result.success = false;
                    result.error = 2; //error on update document
                    status = 500;
                }
                result.user = updatedDocument;
            });
        }
        else {
            result.success = false;
            result.error = 2; //user doesn't exist
            status = 500;
        }

    });
});
module.exports = router;