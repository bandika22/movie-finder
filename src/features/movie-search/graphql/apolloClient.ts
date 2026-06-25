import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://tmdb.sandbox.zoosh.ie/dev/graphql',
  }),
  cache: new InMemoryCache(),
});