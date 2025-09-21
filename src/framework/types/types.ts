enum TransactionType {
  Account = 'account',
  Card = 'card',
}

enum TransactionStatus {
  Future = 'future',
  Financial = 'financial',
  Authorization = 'authorization',
}

enum TransactionCategory {
  Other = 'other',
  Groceries = 'groceries',
  GoingOut = 'goingOut',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  iconURL: string;
  localizableTitle: string;
  categoryIconUrl: string;
  deleted: string | null;
  status: TransactionStatus;
  time: string;
  categoryID: TransactionCategory;
  transactionAmount: Amount | null;
  billingAmount: Amount;
}

interface Amount {
  amount: number;
  currency: string;
}
