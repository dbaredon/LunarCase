import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import 'normalize.css';
import { App } from './App';
import { createClient } from './graphql_server/mock_server';
import './index.css';
import { createRoot } from 'react-dom/client';

const run = async () => {
  const client = await createClient();
  const container = document.getElementById('root');
  const root = createRoot(container!);

  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
};

run();
