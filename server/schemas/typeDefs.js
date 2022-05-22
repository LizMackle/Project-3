const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User {
  _id: ID!
  username: String
  email: String
  password: String
  reviews: [Review]
}

type Review {
  _id: ID!
  latitude: Float
  longitude: Float
  reviewContent:[reviewContent]!
}

type reviewContent {
  _id: ID!
  title: String
  text: String
  reviewAuthor: String
  stars: Int
  createdAt: String
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    reviews(username: String): [Review]
    review(reviewId: ID!): Review
  }

  type Mutation {
    addUser:(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview: [Review]
    deleteUser(userId: ID!): User
    deleteReview(reviewId: ID!): Review

  }
`;

module.exports = typeDefs;
