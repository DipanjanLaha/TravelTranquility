const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

// Create and export User model
const User = mongoose.model('User', userSchema);
module.exports = User;
