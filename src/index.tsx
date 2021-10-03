import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { UserProvider } from 'contexts/UserContext';
import { setContext } from '@apollo/client/link/context';
import { API_URL } from './constants';

const httpLink = createHttpLink({
  uri: API_URL,
  credentials: 'include',
});

async function callFetch(headers: object) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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

  if (result && result.errors) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expires');
    localStorage.removeItem('userInfo');
    return headers;
  } else {
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
}

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  const expires = localStorage.getItem('expires');

  if (token && expires) {
    if (Date.parse(expires) - Date.now() < 0) {
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
