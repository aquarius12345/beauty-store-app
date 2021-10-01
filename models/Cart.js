const { Schema, model } = require('mongoose');

const cartSchema = new Schema (
    {
        user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        products: [{ type: Schema.Types.ObjectId, ref: 'CartProducts' }]
    },
    {
        timestamps: true
    }
);

module.exports = model('Cart', cartSchema);