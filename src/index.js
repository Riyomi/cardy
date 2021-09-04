import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserProvider } from 'contexts/UserContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
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
