const { Schema, model } = require("mongoose");

const revContSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },

    text: {
      type: String,
      trim: true,
    },

    stars: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    id: true,
  },
);


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

  reviews: [revContSchema],
},
{
 id: true,
}
);

const Review = model("Review", reviewSchema);

module.exports = Review;
