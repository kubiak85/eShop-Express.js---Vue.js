const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        require: true
    },
    weight: {
        type: mongoose.Schema.Types.Decimal128,
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }
})

module.exports = mongoose.model('Product', ProductSchema);