export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
  }
  
  export interface UserInfo {
    name: string;
    email: string;
    accountBalance: number;
    transactions: Transaction[];
    loans: Loan[];
    activeLoan: Loan | null;
  }
  
  export interface Loan {
    id: string;
    amount: number;
    interestRate: number;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'defaulted';
    remainingAmount: number;
    monthlyPayment: number;
    purpose: string;
    nextPaymentDate: string;
  }
  
  export type SortField = 'date' | 'amount' | 'type';
  export type SortDirection = 'asc' | 'desc';
  export type TransactionFilter = 'all' | 'credit' | 'debit'; 