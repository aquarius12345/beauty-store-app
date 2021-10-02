const { Router } = require('express');
const CartProduct = require('../models/CartProduct');
const Cart = require('../models/Cart');

const router = Router();


//get all Cart Product do user logado
router.get('/cart-product', async (req, res) => {
    const { id } = req.user;
     try {
        const cart = await Cart.findOne({user_id: id});
        const all = await CartProduct.find({ cart_id: cart._id }).populate('product_id');
        res.status(200).json(all);
     } catch (error) {
         res.status(500).json(error);
     }
});


//get one Cart Product do user logado
router.get('/cart-product/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await CartProduct.find({ product_id: productId }).populate('product_id');
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
});


//deletar todos os Cart Product
router.delete('/cart-product/all', async (req, res) => {
    const { id } = req.user;

    try {
        //so pra pegar cart id
        const cart = await Cart.findOne({ user_id: id });
        //para deletar tds
        await CartProduct.deleteMany({ cart_id: cart._id});

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting all products in Cart', error});
    }
});



module.exports = router;