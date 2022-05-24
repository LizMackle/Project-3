const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Review {
    _id: ID!
    latitude: Float
    longitude: Float
    title: String
    content: String
    reviewAuthorId: ID!
    stars: Int
    createdAt: String
  }

  type User {
    _id: ID!
    username: String!
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User!]
    user(userId: ID!): User
    reviews: [Review]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(
      latitude: Float!
      longitude: Float!
      title: String!
      content: String!
      stars: Int!
    ): Review
  }
`;

module.exports = typeDefs;

// type reviewSection {
//   _id: ID!
//   title: String
//   content: String
//   reviewAuthor: String
//   stars: Int
//   createdAt: String
// }
