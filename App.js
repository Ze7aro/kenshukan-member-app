import Main from './src/components/Main';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();
export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
    <StatusBar backgroundColor="gray" style="light" />
    <Main />
    </ApolloProvider>
  );
}


