const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const reviewSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  longitude: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    trim: true,
  },
  stars: {
    type: Number,
    default: 0,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
