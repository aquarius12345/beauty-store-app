const { Schema, model } = require('mongoose');

const productSchema = new Schema (
    {
        name: { type: String, unique: true },
        category: String,
        type: String,
        skin_type: String,
        description: String,
        price: Number,
        rating: Number,
        image_one: String,
        image_two: String,
        brand: String,
        units_in_stock: Number,
        ingredients: String,
        size: String,
        reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}]
    },
    { timestamps: true }
);

module.exports = model('Product', productSchema);