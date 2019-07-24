'use strict';

const mongoose = require('mongoose');

const wishItemSchema = new mongoose.Schema({
  title: String,
  img: String,
  rating: String,
  price: String,
  description: String,
  messenger: [{ userId: String, text: String }],
  active: Boolean,
  reserve: Boolean
});

module.exports = mongoose.model('WhisItem', wishItemSchema);