const { AuthenticationError } = require("apollo-server-express");
const { User, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      return User.findOne({ _id: args.userId });
    },

    me: async (parent, args, context) => {
      return User.findOne({ _id: context.user._id });
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    // me: async (parent, args, context) => {
    //   if (context.User) {
    //     return Review.findOne({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },

    // reviews: async () => {
    //   return Review.find();
    // },

    // review: async (parent, { reviewId }) => {
    //   return Review.findOne({ _id: reviewId });
    // },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    // me: async (parent, args, context) => {
    //   if (context.User) {
    //     return Review.findOne({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
  },

  Mutation: {
    // addReview: async (parent, { name, email, password }) => {
    //   const review = await Review.create({ name, email, password });
    //   const token = signToken(user);

    //   return { token, user };
    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("User not found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    // addreview: async (parent, { userId, review }, context) => {
    //   // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
    //   if (context.user) {
    //     return User.findOneAndUpdate(
    //       { _id: userId },
    //       {
    //         $addToSet: { reviews: review },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   // If user attempts to execute this mutation and isn't logged in, throw an error
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    // // Set up mutation so a logged in user can only remove their profile and no one else's
    // removeUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findOneAndDelete({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    // // Make it so a logged in user can only remove a skill from their own profile
    // removeReview: async (parent, { review }, context) => {
    //   if (context.user) {
    //     return User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { reviews: review } },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
  },
};

module.exports = resolvers;
