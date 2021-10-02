const { Router } = require('express');
const Cart = require('../models/Cart');
const CartProduct = require('../models/CartProduct');

const router = Router();

//get all
router.get('/cart', async (req, res) => {
    const { id } = req.user;

    try {
        const cart = await Cart.find({ user_id: id });
        console.log('this is Cart routes', cart);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});


//Criar Cart, criar um CartProduct e adicionar no Cart
router.post('/cart/:productId', async ( req, res) => {
    const { productId } = req.params;
    const { id } = req.user;
    const { qty } = req.body;

    try {
        const cart = await Cart.findOne({ user_id: id });
        console.log('cart inside cart routes', cart);

        //se nao achar Cart
        if(!cart) {
            const newcart = await Cart.create({ user_id: id });
            console.log('newcart', newcart);

            const payload = {
                product_id: productId,
                cart_id: newcart._id,
                qty
            }

            const productCart = await CartProduct.create(payload);
            console.log('productCart', productCart);

            await Cart.findByIdAndUpdate(newcart._id, { $push: { products: productCart._id } }, { new: true });
            res.status(201).json(productCart);

        } else {
            //se encontar Cart
            const payload = {
                product_id: productId,
                cart_id: cart._id,
                qty
            }
            //console.log('payload', payload);

            const prodCart = await CartProduct.create(payload);
            console.log('productCart', prodCart);

            await Cart.findByIdAndUpdate(cart._id, { $push: { products: prodCart._id } }, { new: true });
            res.status(201).json(prodCart);
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error while adding product to cart', error });
    }
});


//Editar(quantidade)
router.put('/cart/:productId', async (req,res) => {
    const { id } = req.user;
    const { qty } = req.body;
    const { productId } = req.params;
    //console.log('qty', qty);
    try {
        const cart = await Cart.find({ user_id: id });
        const product = await CartProduct.findOneAndUpdate({ product_id: productId}, { qty }, { new: true });
        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json(error);
    }
});


//deletar um Cart Product dentro do Cart
router.delete('/cart/:productId', async (req, res) => {
    const { productId } = req.params;
    const { id } = req.user

    try {
        //procurar id do Cart 
        const cart = await Cart.findOne({ user_id: id });
        console.log('this is cart', cart);
        //procurar id do CartProduct que quero deletar
        const prodCart = await CartProduct.findOne({ cart_id: cart._id, product_id: productId });
        console.log('prodCart', prodCart);

        //remover em Cart(Array)
        await Cart.findByIdAndUpdate(cart._id, { $pull: { products:  prodCart._id }  }, { new: true } );

        //remover em CartProduct
        await CartProduct.findOneAndDelete({ cart_id: cart._id, product_id: productId });
        res.status(200).json();

    } catch(error) {
        res.status(500).json({ message: 'Error deleting product in Cart', error});
    }
});


//limpar Cart(remover todos os produtos)
router.delete('/cart/all-products', async (req, res) => {
    const { id } = req.user;
    
    try {
        const cart = await Cart.findOne({ user_id: id });

        //deletar todos os CartProduct
        await CartProduct.deleteMany({ cart_id: cart._id });

        //deletar dentro de Cart
        await Cart.findByIdAndUpdate(cart._id, { $set: { products: [] }});
        res.status(200).json();

    } catch (error) {
        res.status(500).json(error);
    }
});


//remover Cart




module.exports = router;
