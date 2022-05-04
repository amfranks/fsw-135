const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// inventory schema
const inventorySchema = new Schema({
    item_name: {
        type: String,
        required: true
    },
    item_type: {
        type: String,
        required: true
    },
    item_price: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Inventory', inventorySchema);