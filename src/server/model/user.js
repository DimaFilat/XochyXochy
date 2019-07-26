/* eslint-disable max-len */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Mongo URI
const mongoURI = 'mongodb://localhost:27017/XochyXochy';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2cYw2VRDMKs4gdoWaR_wuxXjtqfsnUtXij7aVpzAHQtJY2la5'
  },
  celebrationDate: [
    {
      title: String,
      date: Date,
      cycle: false
    }
  ],
  email: {
    type: String,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  wishItem: []
});

module.exports = conn.model('User', userSchema);
