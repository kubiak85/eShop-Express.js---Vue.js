const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { validationResult } = require('express-validator');
const orderValidator = require('../validator/order')
const cors = require('cors')
const corsOptions = require('../cors');


router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    }
    catch(err) {
        res.json({errors: err});
    }
});

router.get('/status/:statusId', orderValidator.validate('getProdutsWithStatus'), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        const orders = await Order.find({ status: req.params.statusId });
        res.json(orders);
    }
    catch(err) {
        res.json({errors: err});
    }
});

router.get('/:orderId', orderValidator.validate('getOrder'), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        const order = await Order.findById(req.params.orderId);
        res.json(order);
    }
    catch(err) {
        res.json({errors: err});
    }
});

router.post('/', orderValidator.validate('addOrder'), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    
    const order = new Order({
        date: req.body.date,
        status: "5e0f90194c16ef52205d9531",
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPhone: req.body.userPhone,
        orders: req.body.orders
    });
    
    try {
        const saveOrder = await order.save();
        res.json(saveOrder);
    }
    catch(err) {
        res.json({errors: err});
    }
});

router.put('/:orderId/stan', [cors(corsOptions), orderValidator.validate('putOrderStan')], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
	const order = await Order.findById(req.params.orderId);
	try {
        //5e0f90194c16ef52205d9531 - NIEZATWIERDZONE
        //5e0f90214c16ef52205d9532 - ZATWIERDZONE
        //5e0f90284c16ef52205d9533 - ANULOWANE
        //5e0f902d4c16ef52205d9534 - ZREALIZOWANE

        if(order.status == "5e0f90284c16ef52205d9533")
			throw new Error('Zamówienie posiada status ANULOWANY, nie można zmienić stanu')

        if(order.status == "5e0f902d4c16ef52205d9534")
            throw new Error('Zamówienie posiada status ZREALIZOWANE, nie można zmienić stanu')

        if(order.status == "5e0f90214c16ef52205d9532" && req.body.status == "5e0f90194c16ef52205d9531")
            throw new Error('Nie można zmienić statusu z ZATWIERDZONE na NIEZATWIERDZONE')

    }
    catch(err) {
		err.name = '';
        return res.status(422).json({ errors:  [{msg: err.toString()}]})
    }
	try {
        const updatedOrderStan = await Order.updateOne({_id: req.params.orderId}, {$set: {status: req.body.status}})
        if(req.body.status === "5e0f90214c16ef52205d9532"){
            await Order.updateOne({_id: req.params.orderId}, {$set: {date: Date.now()}})
        }
            
        res.json(updatedOrderStan);
    }
    catch(err) {
        res.json({errors: err});
    }
});

module.exports = router;