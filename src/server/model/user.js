const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  img: String,
  celebrationDate: Date,
  wishItem: []
});

module.exports = mongoose.model('User', userSchema);
