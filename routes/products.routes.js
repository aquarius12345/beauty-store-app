const { Router } = require('express');
const Product = require('../models/Product');

const router = Router();

//get all products
router.get('/product/all', async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get one product
router.get('/product/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;