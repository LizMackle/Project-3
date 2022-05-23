import { gql } from "@apollo/client";

export const QUERY_USER = gql`
    query getUser(userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            reviews {
                _id
                latitude
                longitude
                reviewSection {
                    _id 
                    title
                    content
                    reviewAuthor
                    stars
                    createdAt
                }
            }
        }
    }
`;

export const QUERY_REVIEWS = gql`
  query getReviews {
    _id
    latitude
    longitude
    reviewSection {
      _id
      title
      content
      reviewAuthor
      stars
      createdAt
    }
  }
`;

export const QUERY_SINGLE_REVIEW = gql`
  query getSingleReview($reviewId: ID!) {
    review {
      _id
      latitude
      longitude
      reviewSection {
        _id
        title
        content
        reviewAuthor
        stars
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_ME = gql`
  query me {
    _id
    username
    email
    reviews {
      _id
      latitude
      longitude
      reviewSection {
        _id
        title
        content
        reviewAuthor
        stars
        createdAt
      }
    }
  }
`;
