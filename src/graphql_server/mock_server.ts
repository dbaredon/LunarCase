/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SchemaLink } from '@apollo/client/link/schema';
import { ApolloClient, InMemoryCache, Resolvers } from '@apollo/client';
import TestData from './data/transactions_test_dev.json';
import { Transaction } from '../framework/types/types';

const typeDefs = `
  enum TransactionType {
    account
    card
  }

  enum TransactionStatus {
    future
    financial
    authorization
  }
  
  enum TransactionCategory {
    other
    groceries
    goingOut
  }

  type Amount {
    amount: Float!
    currency: String!
  }

  type Transaction {
    id: ID!
    type: TransactionType!
    iconURL: String!
    localizableTitle: String!
    categoryIconUrl: String!
    deleted: String
    status: TransactionStatus!
    time: String!
    categoryID: TransactionCategory!
    transactionAmount: Amount
    billingAmount: Amount!
  }

  input TransactionsInput {
    userId: ID!
  }

  type Query {
    transactions(input: TransactionsInput): [Transaction!]!
  }

  input DeleteAuthorizationInput {
    transactionId: ID!
  }

  type DeleteAuthorizationPayload {
    error: String
    transaction: Transaction
  }

  type Mutation {
    deleteAuthorization(input: DeleteAuthorizationInput!): DeleteAuthorizationPayload
  }
`;

export const createClient = async () => {
  let transactions = [
    ...TestData.data.transactions,
  ] as ReadonlyArray<Transaction>;

  const resolvers: Resolvers = {
    Query: {
      transactions: async (_root, _args, _context, _info) => {
        await delay(50 + Math.random() * 450);

        return transactions;
      },
    },
    Mutation: {
      deleteAuthorization: async (
        _root,
        { input: { transactionId } },
        _context,
        _info
      ) => {
        let updatedTransaction = null;

        transactions = transactions.map(transaction => {
          if (transaction.id === transactionId) {
            updatedTransaction = {
              ...transaction,
              deleted: new Date().toISOString(),
            };

            return updatedTransaction;
          }
          return transaction;
        });

        await delay(50 + Math.random() * 950);

        if (!updatedTransaction) {
          return {
            error: 'Transaction not found',
            transaction: null,
          };
        }

        return {
          error: null,
          transaction: updatedTransaction,
        };
      },
    },
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema, validate: true }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return client;
};

const delay = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
