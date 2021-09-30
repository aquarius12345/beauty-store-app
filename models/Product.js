const { Schema, model } = require('mongoose');

const productSchema = new Schema (
    {
        name: String,
        category: String,
        type: String,
        skyn_type: String,
        description: String,
        price: Number,
        rating: Number,
        image_one: String,
        image_two: String,
        brand: String,
        units_in_stock: Number
    },
    { timestamps: true }
);

module.exports = model('Product', productSchema);