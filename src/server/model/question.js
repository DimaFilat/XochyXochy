const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: String,
  point: Number,
  question: String,
  answer: String,
  people: Array,
});

module.exports = mongoose.model("Question", questionSchema);
