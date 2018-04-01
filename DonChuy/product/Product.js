
// Product.js
var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    keywords: [String],
    price: Number,
    category: String,
    code: String,
    picture: String
});
mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('Product');