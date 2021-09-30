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


//adicionar imagem do cloudinary
router.put('/product/upload-image/:productId', uploadImage.single('image'), async(req, res) => {
    const { path } = req.file
    console.log('req.file', req.file);
    const { productId } = req.params;

    try {
        const updatePic = await Product.findByIdAndUpdate(productId, { image_one: path }, { new: true});
        res.status(200).json(updatePic);
    } catch(error) {
        res.status(500).json(error);
    }
});


module.exports = router;


