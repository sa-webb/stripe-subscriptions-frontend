import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-components';

import { Routes } from './Routes';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: "include"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
  
});

const WrappedApp = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

render(WrappedApp, document.getElementById('root'));
