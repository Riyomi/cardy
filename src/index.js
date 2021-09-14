import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { UserProvider } from 'contexts/UserContext';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://alpha-cardy-backend.herokuapp.com/graphql',
});

async function callFetch(headers) {
  const res = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation {
            accessToken {
              accessToken
              expires
            }
          }`,
    }),
  });

  const result = await res.json();

  if (result?.errors) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expires');
    localStorage.removeItem('userInfo');
  }

  const { accessToken, expires } = result.data.accessToken;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('expires', expires);

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
}

const authLink = setContext((_, { headers }) => {
  if (localStorage.getItem('accessToken')) {
    const token = localStorage.getItem('accessToken');

    if (Date.parse(localStorage.getItem('expires')) - Date.now() < 0) {
      return callFetch(headers);
    } else {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
