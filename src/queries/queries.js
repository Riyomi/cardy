import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        name
        email
        img
        decks {
          id
          title
        }
        followers {
          id
          name
          experience
          level
          img
        }
        following {
          id
          name
          experience
          level
          img
        }
      }
      accessToken
      refreshToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $name: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      email: $email
      name: $name
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      img
      decks {
        id
        title
      }
      followers {
        id
        name
        level
        experience
        img
      }
      following {
        id
        name
        level
        experience
        img
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($followerId: ID!, $followingId: ID!) {
    followUser(followerId: $followerId, followingId: $followingId) {
      id
      email
      name
      decks {
        id
        title
      }
      followers {
        id
        name
        level
        experience
        img
      }
      following {
        id
        name
        level
        experience
        img
      }
    }
  }
`;
