/* eslint-disable max-len */
const mongoose = require('mongoose');
// Mongo URI
const mongoURI = 'mongodb://localhost:27017/XochyXochy';

const conn = mongoose.createConnection(mongoURI);

const wishItemSchema = new mongoose.Schema({
  title: String,
  img: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToGpfNjV8k5RIRi2VHOjY5tLyMcaHgDHtoGgbRZXZgstdx5wJN'
  },
  rating: String,
  price: String,
  description: String,
  messenger: [{ userId: String, text: String }],
  active: Boolean,
  reserve: Boolean,
  picLink: String
});

module.exports = conn.model('WishItem', wishItemSchema);
