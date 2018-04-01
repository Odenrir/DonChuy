// app.js
var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);
var ProductController = require('./product/ProductController');
app.use('/products', ProductController);

module.exports = app;