'use strict';

const mongoose = require('mongoose');
// Mongo URI
const mongoURI = 'mongodb://localhost:27017/XochyXochy';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  img: String,
  celebrationDate: [{
    title: String,
    date: Date,
    cycle: false
  }],
  wishItem: []
});

module.exports = conn.model('User', userSchema);