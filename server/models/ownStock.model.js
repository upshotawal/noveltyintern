const mongoose = require('mongoose')

const OwnStock = new mongoose.Schema({
    user: { type: String, required: true },
    stockId: { type: String, required: true },
    stock_name: { type: String, required: true },
    stock_price: { type: Number, required: true },
    stock_amount: { type: Number, required: true },

}, { collection: 'ownStock' })

const model = mongoose.model('OwnStockData', OwnStock)

module.exports = model