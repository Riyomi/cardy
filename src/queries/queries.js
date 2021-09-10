import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        name
        img
        followers {
          id
          name
          level
          experience
        }
        following {
          id
          name
          level
          experience
        }
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
  mutation CreateDeck($title: String, $img: String, $categoryId: ID) {
    createDeck(title: $title, img: $img, categoryId: $categoryId) {
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
        title
        img
        learners
        publicId
        category {
          id
          name
        }
        cards {
          id
          front
          back
        }
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
      publicId
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
      }
      createdBy {
        id
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
      learners
      publicId
      category {
        id
        name
      }
      user {
        id
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
        front
        back
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

export const QUIT_DECK = gql`
  mutation QuitDeck($id: ID!) {
    quitDeck(id: $id) {
      id
      title
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

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id)
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

export const CHANGE_VISIBILITY = gql`
  mutation ChangeVisibility($id: ID!) {
    changeVisibility(id: $id)
  }
`;
