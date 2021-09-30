const { Router } = require('express');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const uploadImage = require('../config/cloudinary.config');


const router = Router();

//criar um produto
router.post('/product', async (req, res) => {
    const payload = req.body;
    const { id } = req.user;
    try {
        const adminId = await Admin.findById(id);
        if(!adminId) {
            throw new Error('user not found');
        }

        const newProduct = await Product.create(payload);
        res.status(201).json(newProduct);
        console.log('one product', newProduct);
    } catch(error) {
        res.status(500).json({ msg: 'Error while creating product', error });
    }
});

//criar varios produtos de uma vez(array de produtos)
router.post('/poduct/many', async (req, res) => {
    const payload = req.body;
    try {
        const newProducts =  await Product.create([payload]);
        console.log('new products array', newProducts);
        res.status(201).json(newProducts);
    } catch(error) {
        res.status(500).json({ msg: 'Error while creating products'});
    }
});

module.exports = router;


