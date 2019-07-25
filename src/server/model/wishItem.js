/* eslint-disable max-len */
const mongoose = require('mongoose');

const wishItemSchema = new mongoose.Schema({
  title: String,
  img: {
    type: String,
    default:
      'https://www.google.com/imgres?imgurl=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F02%2F04%2F81%2F27%2F500_F_204812748_ULgdItIhFPI6S1Mbwr4fChCnrkYhfWkz.jpg&imgrefurl=https%3A%2F%2Fwww.fotolia.com%2Fid%2F204812748&docid=ERS1ckYOOtPZuM&tbnid=cu4MWwTY79eUuM%3A&vet=10ahUKEwjUp5DJ783jAhXos4sKHXKlC20QMwioAShZMFk..i&w=500&h=500&bih=637&biw=1317&q=product%20%20pic%20no%20background&ved=0ahUKEwjUp5DJ783jAhXos4sKHXKlC20QMwioAShZMFk&iact=mrc&uact=8'
  },
  rating: String,
  price: String,
  description: String,
  messenger: [{ userId: String, text: String }],
  active: Boolean,
  reserve: Boolean
});

module.exports = mongoose.model('WhisItem', wishItemSchema);
