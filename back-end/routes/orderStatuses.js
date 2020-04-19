const express = require('express');
const router = express.Router();
const OrderStatus = require('../models/OrderStatus');

router.get('/', async (req, res) => {
    try {
        const orderStatuses = await OrderStatus.find();
        res.json(orderStatuses);
    }
    catch(err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    const orderStatus = new OrderStatus({
        name: req.body.name
    });
    
    try {
        const saveOrderStatus = await orderStatus.save();
        res.json(saveOrderStatus);
    }
    catch(err) {
        res.json({message: err});
    }
});

router.delete('/:orderStatusId', async (req, res) => {
    try {
        const removedOrderStatus= await Post.remove({_id: req.params.orderStatusId})
        res.json(removedOrderStatus);
    }
    catch(err) {
        res.json({message: err});
    }
});
module.exports = router;