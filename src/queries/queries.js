import { gql } from '@apollo/client';

/* Authentication */

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        name
        img
        experience
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

/* User related mutations */

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
      user {
        id
        name
        img
        experience
      }
      accessToken
      expires
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: ID!) {
    followUser(userId: $userId)
  }
`;

/* General purpose queries */

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      img
      experience
      mastered
      decks {
        id
        title
        img
        learners
        publicId
        mastered
        cards {
          id
          front
          back
          nextReview
        }
      }
      followers {
        id
        name
        experience
        img
      }
      following {
        id
        name
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
      publicId
      mastered
      category {
        id
        name
      }
      user {
        id
      }
      cards {
        id
        front
        back
        nextReview
      }
      createdBy {
        id
        name
      }
    }
  }
`;

export const GET_DECKS = gql`
  query getDecks {
    decks {
      id
      title
      img
      learners
      publicId
      category {
        id
        name
      }
      category {
        name
      }
      createdBy {
        id
        name
      }
      cards {
        id
      }
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

/* Deck related mutations */

export const CREATE_DECK = gql`
  mutation CreateDeck($title: String, $img: String, $categoryId: ID) {
    createDeck(title: $title, img: $img, categoryId: $categoryId) {
      id
      title
    }
  }
`;

export const EDIT_DECK = gql`
  mutation EditDeck($id: ID!, $categoryId: ID!, $title: String) {
    editDeck(id: $id, categoryId: $categoryId, title: $title) {
      id
      title
      category {
        name
      }
    }
  }
`;

export const COPY_DECK = gql`
  mutation CopyDeck($id: ID!) {
    copyDeck(id: $id) {
      id
      title
    }
  }
`;

export const QUIT_DECK = gql`
  mutation QuitDeck($id: ID!) {
    quitDeck(id: $id) {
      id
      title
    }
  }
`;

export const CHANGE_VISIBILITY = gql`
  mutation ChangeVisibility($id: ID!) {
    changeVisibility(id: $id)
  }
`;

/* Card related mutations */

export const CREATE_CARD = gql`
  mutation CreateCard(
    $deckId: ID!
    $front: String!
    $back: String!
    $img: String
    $audio: String
  ) {
    createCard(
      deckId: $deckId
      front: $front
      back: $back
      img: $img
      audio: $audio
    ) {
      id
      publicId
      front
      back
    }
  }
`;

export const EDIT_CARD = gql`
  mutation EditCard($id: ID!, $front: String!, $back: String!) {
    editCard(id: $id, front: $front, back: $back) {
      id
      front
      back
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id)
  }
`;

export const STUDY_SESSION = gql`
  mutation StudySession($cards: String!) {
    studySession(cards: $cards)
  }
`;

export const RESET_DECK = gql`
  mutation ResetDeck($id: ID!) {
    resetDeck(id: $id) {
      id
      title
    }
  }
`;
