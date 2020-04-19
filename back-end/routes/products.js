const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const productValidator = require('../validator/product');
const cors = require('cors')
const corsOptions = require('../cors');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch(err) {
        res.json({errors: err});
    }
});

router.get('/:productId', productValidator.validate('getProduct'),  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    }
    catch(err) {
        res.json({errors: err});
    }
});
//
router.post('/', [cors(corsOptions), productValidator.validate('addProduct')], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
	
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        weight: req.body.weight,
        categoryId: req.body.categoryId
    });

    try {
        const saveProduct = await product.save();
        res.json(saveProduct);
    }
    catch(err) {
        res.json({errors: err});
    }

});

router.delete('/:productId', [cors(corsOptions), productValidator.validate('deleteProduct')], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        const removedProduct = await Product.remove({_id: req.params.productId})
        res.json(removedProduct);
    }
    catch(err) {
        res.json({errors: err});
    }
});

router.put('/:productId',[cors(corsOptions), productValidator.validate('putProduct')], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    try {
        const product = await Product.findById(req.params.productId);
        if(!req.body.name)
            req.body.name = product.name

        if(!req.body.description)
            req.body.description = product.description

        if(!req.body.price)
            req.body.price = product.price
        
        if(!req.body.weight)
            req.body.weight = product.weight

        if(!req.body.categoryId)
            req.body.categoryId = product.categoryId
            
        const updatedProduct= await Product.updateOne(
            {
                _id: req.params.productId
            }, 
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    weight: req.body.weight,
                    categoryId: req.body.categoryId
                }
            });
        res.json(updatedProduct);
    }
    catch(err) {
        res.json({errors: err});
    }
});

module.exports = router;