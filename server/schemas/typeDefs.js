const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Review {
    _id: ID
    latitude: Float
    longitude: Float
    title: String
    comment: String
    stars: Int
  }

  type User {
    _id: ID
    name: String
    email: String
    password: String
    reviews: [Review]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
// type Mutation {
//   // addUser(name: String!, email: String!, password: String!): Auth
//   login(email: String!, password: String!): Auth

//   // addReview(userId: ID!, skill: String!): User
//   // removeUser: User
//   // removeReview(reviews: String!): User
// }
