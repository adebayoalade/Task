import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransactionList from '../TransactionList';
import { Transaction } from '../../types';
import '@testing-library/jest-dom';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-20',
    description: 'Salary Deposit',
    amount: 5000.0,
    type: 'credit',
  },
  {
    id: '2',
    date: '2024-03-19',
    description: 'Online Purchase',
    amount: -2000.00,
    type: 'debit',
  },
  {
    id: '3',
    date: '2024-03-18',
    description: 'Restaurant Payment',
    amount: -1000.00,
    type: 'debit',
  },];


describe('TransactionList', () => {
  // Mock window.innerWidth before each test
  beforeEach(() => {
    // Set to desktop view by default
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });
    window.dispatchEvent(new Event('resize'));
  });

  it('renders all transactions by default', () => {
    render(<TransactionList transactions={mockTransactions} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4); // Header + 3 transactions
  });

  it('filters transactions correctly', async () => {
    const user = userEvent.setup();
    render(<TransactionList transactions={mockTransactions} />);
    const filterSelect = screen.getByRole('combobox');

    // Filter by credits
    await user.selectOptions(filterSelect, 'credit');
    let tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(2); // Header + 1 credit transaction

    // Filter by debits
    await user.selectOptions(filterSelect, 'debit');
    tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(3); // Header + 2 debit transactions
  });

  it('sorts transactions by amount', async () => {
    render(<TransactionList transactions={mockTransactions} />);
    
    const amountHeader = screen.getByRole('columnheader', { name: /amount/i });
    
    // First click - should sort descending
    await fireEvent.click(amountHeader);
    
    let rows = screen.getAllByRole('row').slice(1); // Skip header row
    let amounts = rows.map(row => {
      const amountCell = within(row).getByRole('cell', { name: /[+-]?\$[\d,.]/ });
      return parseFloat(amountCell.textContent!.replace(/[^0-9.-]/g, ''));
    });
    
    expect(amounts).toEqual([5000, -1000, -2000]);
    
    // Second click - should sort ascending
    await fireEvent.click(amountHeader);
    
    rows = screen.getAllByRole('row').slice(1); // Skip header row
    amounts = rows.map(row => {
      const amountCell = within(row).getByRole('cell', { name: /[+-]?\$[\d,.]/ });
      return parseFloat(amountCell.textContent!.replace(/[^0-9.-]/g, ''));
    });
    
    expect(amounts).toEqual([-2000, -1000, 5000]);
  });

  it('displays correct transaction types with appropriate styling', () => {
    render(<TransactionList transactions={mockTransactions} />);
    
    const rows = screen.getAllByRole('row').slice(1);
    
    const creditBadge = within(rows[0]).getByText(/credit/i);
    expect(creditBadge).toHaveClass('bg-green-100', 'text-green-800');
    
    const debitBadge = within(rows[1]).getByText(/debit/i);
    expect(debitBadge).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('formats currency values correctly', () => {
    render(<TransactionList transactions={mockTransactions} />);
    
    const rows = screen.getAllByRole('row').slice(1);
    
    const creditCell = within(rows[0]).getByRole('cell', { name: /\$5,000\.00/ });
    expect(creditCell).toHaveTextContent('$5,000.00');
    
    const debitCell = within(rows[1]).getByRole('cell', { name: /-\$2,000\.00/ });
    expect(debitCell).toHaveTextContent('-$2,000.00');
    
    const secondDebitCell = within(rows[2]).getByRole('cell', { name: /-\$1,000\.00/ });
    expect(secondDebitCell).toHaveTextContent('-$1,000.00');
  });

  it('shows mobile view on small screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500
    });
    window.dispatchEvent(new Event('resize'));
    
    render(<TransactionList transactions={mockTransactions} />);
    
    const mobileCards = screen.getAllByTestId('transaction-card');
    expect(mobileCards).toHaveLength(3);
    
    const firstCard = mobileCards[0];
    expect(firstCard).toHaveClass('bg-white', 'rounded-lg', 'shadow');
    expect(within(firstCard).getByText('Salary Deposit')).toBeInTheDocument();
    expect(within(firstCard).getByText('$5,000.00')).toBeInTheDocument();
  });

  it('handles empty transaction list', () => {
    render(<TransactionList transactions={[]} />);
    
    const emptyMessage = screen.queryByText(/no transactions found/i);
    expect(emptyMessage).toBeInTheDocument();    
    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();
    
    const mobileCards = screen.queryAllByTestId('transaction-card');
    expect(mobileCards).toHaveLength(0);
  });
});