const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

let ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        max: 100
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema)