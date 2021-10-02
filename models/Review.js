const { Schema, model } = require('mongoose');

const reviewSchema = new Schema (
    {
        review: { type: String, maxlength: 200 },
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        product_id: { type: Schema.Types.ObjectId, ref: 'Product' }
    }
)

module.exports = model('Review', reviewSchema);