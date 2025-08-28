const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['manager', 'staff'], default: 'staff' }
});
module.exports = mongoose.model('User', UserSchema);
