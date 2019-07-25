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
      'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.shutterstock.com%2Fimage-vector%2Funknown-user-icon-trendy-flat-260nw-619490732.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Funknown%2Buser&docid=WacG2ZPsdhW7hM&tbnid=Oh9zimhdXiB-6M%3A&vet=10ahUKEwiD0fWW783jAhXh0qYKHR8FBIoQMwhEKAAwAA..i&w=260&h=280&bih=637&biw=1317&q=user%20unknown%20pic&ved=0ahUKEwiD0fWW783jAhXh0qYKHR8FBIoQMwhEKAAwAA&iact=mrc&uact=8'
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
