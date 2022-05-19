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
  content: {
      type: String,
      trim: true,
  },
});

// compare the incoming password with the hashed password
reviewSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Review = model("Review", reviewSchema);

module.exports = Review;
