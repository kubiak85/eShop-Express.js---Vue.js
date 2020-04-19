const mongoose = require('mongoose');

const OrderStatusSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('OrderStatus', OrderStatusSchema);