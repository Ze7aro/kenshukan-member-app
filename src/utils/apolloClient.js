import { InMemoryCache, HttpLink, ApolloClient } from "apollo-boost";

const link = new HttpLink({
    uri: 'https://192.168.100.13:3001.com/graphql', // URL de tu servidor GraphQL
  });
const cache = new InMemoryCache();

const createApolloClient = () => new ApolloClient({
    link: link,
    cache: cache
});

export default createApolloClient