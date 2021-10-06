const { Schema, model } = require('mongoose');

const cartSchema = new Schema (
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        products: [{ type: Schema.Types.ObjectId, ref: 'CartProduct' }],
        status: { type: String, enum: ['aberto', 'fechado', 'pago', 'cancelado'], default: 'aberto'}
    },
    {
        timestamps: true
    }
);

module.exports = model('Cart', cartSchema);