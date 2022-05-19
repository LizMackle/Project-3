const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    reviews: [String]!
  }

  type Review {
    _id: ID
    userId: ID!
    latitude: Int
    longitude: Int
    title: String
    content: String
    stars: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addReview(userId: ID!, skill: String!): User
    removeUser: User
    removeReview(reviews: String!): User
  }
`;

module.exports = typeDefs;
