const { Schema, model } = require('mongoose');

const myListSchema = new Schema (
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
    },
    {
        timestamps: true
    }
);

module.exports = model('MyList', myListSchema);