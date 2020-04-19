const mongoose = require('mongoose');
const order = mongoose.Schema({ 
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    amount: {
        type: Number,
        require: true
    }
});

const ProductSchema = mongoose.Schema({
    date: {
        type: Date
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderStatus',
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    userEmail: {
        type: String,
        require: true
    },
    userPhone: {
        type: String,
        require: true
    },
    orders: [order]
})

module.exports = mongoose.model('Order', ProductSchema);