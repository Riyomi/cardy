const prod = {
  API_URL: 'https://alpha-cardy-backend.herokuapp.com/graphql',
};

const dev = {
  API_URL: 'http://localhost:4000/graphql',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
