import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const QUERY_REVIEWS = gql`
  query getReviews {
    reviews {
      _id
      latitude
      longitude
      title
      content
      reviewAuthorId
      stars
      createdAt
    }
  }
`;

// export const QUERY_SINGLE_REVIEW = gql`
//   query getSingleReview($reviewId: ID!) {
//     review(reviewId: $reviewId) {
//       _id
//       latitude
//       longitude
//       title
//       content
//       reviewAuthorId
//       stars
//       createdAt
//     }
//   }
// `;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
