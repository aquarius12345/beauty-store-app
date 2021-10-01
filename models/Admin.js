const { Schema, model } = require('mongoose');

const adminSchema = new Schema (
    {
        name: { type: String, unique: true, required: true },
        passwordHash: { type: String, reuqired: true }
    },
    {
        timestamps: true
    }
);

module.exports = model('Admin', adminSchema);