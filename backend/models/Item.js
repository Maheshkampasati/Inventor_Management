const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  name: String,
  category: String, // 'cookie' or 'icecream'
  emoji: String,
  stock: Number,
  reorderLevel: Number,
  expiryDate: Date,
});
module.exports = mongoose.model('Item', ItemSchema);
