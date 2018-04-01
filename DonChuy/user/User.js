
// User.js
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    title: String,
    email: String,
    password: String,
    birthdate: Date,
    age: Number,
    address: [],
    balance: Number,
    achievements: [String],
    shoppingcart: [],
    defaultlist: [],
    wishlist: [String],
    usertype: Number,
    rank: String,
    store: String,
    vehicle: String,
    payment: Number,
    avaliable: Boolean

});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');