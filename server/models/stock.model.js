const mongoose = require('mongoose')

const Stock = new mongoose.Schema({
    stock_name: { type: String, required: true, unique: true },
    stock_amount: { type: Number, required: true },
    stock_price: { type: Number, required: true },

}, { collection: 'stocks' })

const model = mongoose.model('StockData', Stock)

module.exports = model