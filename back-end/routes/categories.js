const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    }
    catch(err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name
    });
    
    try {
        const saveCategory = await category.save();
        res.json(saveCategory);
    }
    catch(err) {
        res.json({message: err});
    }
});

router.delete('/:categoryId', async (req, res) => {
    try {
        const removedCategory = await Post.remove({_id: req.params.categoryId})
        res.json(removedCategory);
    }
    catch(err) {
        res.json({message: err});
    }
});
module.exports = router;