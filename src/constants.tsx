const prod = 'https://alpha-cardy-backend.herokuapp.com/graphql';
const dev = 'http://192.168.1.108:4000/graphql';

export const API_URL = process.env.NODE_ENV === 'development' ? dev : prod;

export const DIFFICULTY = {
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
  DIDNT_KNOW: 3,
};

export const MENU = {
  OVERVIEW: 0,
  CARDS: 1,
  EDIT: 2,
};
