import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        name
        img
      }
      accessToken
      expires
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logoutUser
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

export const CREATE_DECK = gql`
  mutation CreateDeck(
    $title: String!
    $img: String
    $isPublic: Boolean!
    $categoryId: ID!
  ) {
    createDeck(
      title: $title
      img: $img
      isPublic: $isPublic
      categoryId: $categoryId
    ) {
      id
      title
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      img
      decks {
        id
        img
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

export const GET_DECK = gql`
  query getDeck($id: ID) {
    deck(id: $id) {
      id
      title
      img
      learners
      cards {
        front
        back
      }
      createdBy {
        name
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($userToBeFollowed: ID!) {
    followUser(userToBeFollowed: $userToBeFollowed) {
      id
      email
      name
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userToBeUnfollowed: ID!) {
    unfollowUser(userToBeUnfollowed: $userToBeUnfollowed) {
      id
      email
      name
    }
  }
`;

export const GET_DECKS = gql`
  query getDecks {
    decks {
      id
      title
      img
      category {
        name
      }
      createdBy {
        name
      }
      cards {
        front
        back
      }
      learners
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;
