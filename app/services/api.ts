import { UserInfo } from '../../app/types';

const MOCK_API_DELAY = 1000;

const mockUserData: UserInfo = {
  name: 'Adebayo David',
  email: 'brilldavid@gmail.com',
  accountBalance: 50000.00,
  transactions: [
    {
      id: '1',
      date: '2024-03-20',
      description: 'Salary Deposit',
      amount: 5000.00,
      type: 'credit'
    },
    {
      id: '2',
      date: '2024-03-19',
      description: 'Online Purchase',
      amount: 2000.00,
      type: 'debit'
    },
    {
      id: '3',
      date: '2024-03-18',
      description: 'Restaurant Payment',
      amount: 1000.00,
      type: 'debit'
    }
  ],
  loans: [
    {
      id: 'loan1',
      amount: 10000,
      interestRate: 5.5,
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      status: 'active',
      remainingAmount: 8750.50,
      monthlyPayment: 875.50,
      purpose: 'Home Renovation',
      nextPaymentDate: '2024-04-15'
    },
    {
      id: 'loan2',
      amount: 5000,
      interestRate: 4.5,
      startDate: '2023-06-01',
      endDate: '2023-12-01',
      status: 'completed',
      remainingAmount: 0,
      monthlyPayment: 856.25,
      purpose: 'Debt Consolidation',
      nextPaymentDate: '2023-12-01'
    }
  ],
  activeLoan: {
    id: 'loan1',
    amount: 10000,
    interestRate: 5.5,
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    status: 'active',
    remainingAmount: 8750.50,
    monthlyPayment: 875.50,
    purpose: 'Home Renovation',
    nextPaymentDate: '2024-04-15'
  }
};

export const fetchUserData = async (): Promise<UserInfo> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserData);
    }, MOCK_API_DELAY);
  });
};

export const requestLoan = async (request: { amount: number; tenure: number; purpose: string }): Promise<void> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random success/failure
      if (Math.random() > 0.3) {
        resolve();
      } else {
        reject(new Error('Loan request failed. Please try again.'));
      }
    }, MOCK_API_DELAY);
  });
};