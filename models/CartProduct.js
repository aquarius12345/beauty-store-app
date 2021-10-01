const { Schema, model } = require('mongoose');

const cartProdSchema = new Schema(
    {
        cart_id: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
        product_id: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        qty: Number
    },
    { timestamps: true }
);

module.exports = model('CartProduct', cartProdSchema);