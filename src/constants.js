const prod = 'https://alpha-cardy-backend.herokuapp.com/graphql';
const dev = '/graphql';

export const API_URL = process.env.NODE_ENV === 'development' ? dev : prod;
