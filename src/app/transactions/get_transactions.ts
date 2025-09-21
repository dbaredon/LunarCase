import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { Transaction } from '../../framework/types/types';

const TransactionsQuery = gql`
  query GetTransactions($userId: ID!) {
    transactions: transactions(input: { userId: $userId }) {
      id
      type
      iconURL
      localizableTitle
      categoryIconUrl
      deleted
      status
      time
      categoryID
      transactionAmount {
        amount
        currency
      }
      billingAmount {
        amount
        currency
      }
    }
  }
`;

export interface TransactionsQueryData {
  transactions: Array<Transaction>;
}

export interface TransactionsQueryVariables {
  userId: string;
}

export const useTransactionsQuery = (
  options: QueryHookOptions<TransactionsQueryData, TransactionsQueryVariables>
) =>
  useQuery<TransactionsQueryData, TransactionsQueryVariables>(
    TransactionsQuery,
    options
  );
