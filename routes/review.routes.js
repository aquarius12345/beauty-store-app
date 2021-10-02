const { Router } = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');

const router = Router();

//criar um review
router.post('/review/:productId', async(req, res) => {
    const { productId } = req.params;
    const { id } = req.user;

    try {
        const newReview = {...req.body, product_id: productId, user_id: id };
        const reviewCreate = await Review.create(newReview);
        
        await Product.findByIdAndUpdate(productId, { $push: { reviews: reviewCreate._id }});
        res.status(201).json(reviewCreate);
    } catch (error) {
        res.status(500).json({ message: 'Error trying to create review', error });
    }
});


//pegar todos os reviews de um produto
router.get('/review/:productId', async(req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ product_id: productId});
        console.log(reviews);
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error trying to get reviews', error });
    }
});


//update review
router.put('/review/:reviewId', async (req, res) => {
    const { id } = req.user;
    const { reviewId } = req.params
    try {
        const review = await Review.findOneAndUpdate({ _id: reviewId, user_id: id }, req.body, { new: true });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error trying to update a review', error});
    }
});


//remover um comentario
router.delete('/review/:reviewId', async(req, res) => {
    const { reviewId } = req.params;
    const { id } = req.user;
    try {
        const review = await Review.findById({ _id: reviewId});
        if (review.user_id != id) {
            res.status(400).json("User can't delete other user's reviews");
        }
        await Review.findOneAndDelete({ _id: reviewId, userId: id });
        
        await Product.findByIdAndUpdate(review.product_id, { $pull: {reviews: reviewId }});
        res.status(200).json({ message:'review deleted'});

    } catch (error) {
        res.status(500).json({ message: 'Error trying to delete a review'});
    }
});
