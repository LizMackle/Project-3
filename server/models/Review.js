const { Schema, model } = require("mongoose");

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

  reviewSection: [
    {
      title: {
        type: String,
        required: false,
      },

      content: {
        type: String,
        trim: true,
      },

      reviewAuthor: {
        type: String,
        required: true,
        trim: true,
      },

      stars: {
        type: Number,
        default: 0,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Review = model("Review", reviewSchema);

module.exports = Review;
