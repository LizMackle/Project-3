const { AuthenticationError } = require("apollo-server-express");
const { User, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("reviews");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("reviews");
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("reviews");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    reviews: async (parent, { latitude, longitude, reviews }, context) => {
      const params = username ? { username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },

    review: async (parent, { reviewId }) => {
      return Review.findOne({ _id: reviewId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "User not found with this email address!"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addReview: async (parent, { review }, context) => {
      if (context.user) {
        const review = await Review.create({
          reviewContent,
          reviewAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );
        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteUser: async (parent, { username, email, password }, context) => {
      if (context.user) {
        const user = await User.findOneAndDelete({
          _id: userId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id }
          // { $pull: { reviews: review._id } }
        );

        throw new AuthenticationError("User has been deleted!");
      }
    },

    deleteReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const review = await Review.findOneAndDelete({
          _id: reviewId,
          reviewAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reviews: review._id } }
        );
      }
    },
  },
};

module.exports = resolvers;
