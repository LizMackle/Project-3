const { AuthenticationError } = require("apollo-server-express");
const { User, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },

    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId });
    },

    reviews: async (parent, {}) => {
      return await Review.find({}).sort({ createdAt: -1 });
    },

    review: async (parent, { reviewId }) => {
      return Review.findOne({ _id: reviewId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("reviews");
      }
      throw new AuthenticationError("You need to be logged in!");
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
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const review = await Review.create({
          reviewId,
          reviewAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reviews: review._id } }
        );

        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteUser: async (parent, { userId }, context) => {
      if (context.user) {
        const deletedUser = await User.findOneAndDelete({
          _id: userId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { users: deletedUser._id } }
        );
        console.log(deletedUser);
        return deletedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    deleteReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        return Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $pull: {
              reviewSection: {
                _id: reviewSectionId,
                reviewAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
