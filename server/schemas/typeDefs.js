const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    reviews: [Review]
  }

  type Review {
    _id: ID!
    latitude: Float
    longitude: Float
    reviewSection: [reviewSection]!
  }

  type reviewSection {
    _id: ID!
    title: String
    content: String
    reviewAuthor: String
    stars: Int
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User!]
    user(userId: ID!): User
    reviews(username: String): [Review]
    review(reviewId: ID!): Review
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth 
    login(email: String!, password: String!): Auth
    addReview(reviewId: String): Review
    deleteUser(userId: ID!): User
    deleteReview(reviewId: ID!): Review
  }
`;

module.exports = typeDefs;
