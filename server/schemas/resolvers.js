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

    reviews: async (parent, args, context) => {
      
      {
        return await Review.find({}).sort({ createdAt: -1 });
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      
      console.log({ username });
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
        throw err;
      }
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

    addReview: async (
      parent,
      { latitude, longitude, title, content, stars },
      context
    ) => {
      if (context.user) {
        const review = await Review.create({
          latitude,
          longitude,
          title,
          content,
          stars,
          reviewAuthorId: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reviews: review._id } }
        );

        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
