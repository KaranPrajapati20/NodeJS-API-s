const mongoose = require('mongoose');
console.log("model is working");


const prod = mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    left: { type: Number, default: 0 }
}, {
    timestamps : true,
})

const productModel = mongoose.model('Product', prod)

module.exports = productModel;