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
    amount: 89.99,
    type: 'debit',
  },
  {
    id: '3',
    date: '2024-03-18',
    description: 'Restaurant Payment',
    amount: 45.5,
    type: 'debit',
  },
];

describe('TransactionList', () => {
  it('renders all transactions by default', () => {
    render(<TransactionList transactions={mockTransactions} />);
    const rows = screen.getAllByRole('row');

    // Add 1 for header row
    expect(rows).toHaveLength(mockTransactions.length + 1);
  });

  it('filters transactions correctly', async () => {
    render(<TransactionList transactions={mockTransactions} />);

    // Get the filter dropdown
    const filterSelect = screen.getByRole('combobox');

    // Filter by credits
    await userEvent.selectOptions(filterSelect, 'credit');
    const creditRows = screen.getAllByRole('row');

    // Add 1 for header row
    expect(creditRows).toHaveLength(2); // 1 credit transaction + header

    // Filter by debits
    await userEvent.selectOptions(filterSelect, 'debit');
    const debitRows = screen.getAllByRole('row');
    expect(debitRows).toHaveLength(3); // 2 debit transactions + header
  });

  it('sorts transactions by amount', async () => {
    render(<TransactionList transactions={mockTransactions} />);

    // Find and click the amount header
    const amountHeader = screen.getByRole('columnheader', { name: /amount/i });
    fireEvent.click(amountHeader);

    // Get all amount cells
    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    const amounts = rows.map((row: HTMLElement) => {
      const amountCell = within(row).getByRole('cell', { name: /\$[\d,.]/ });
      return parseFloat(amountCell.textContent!.replace(/[^0-9.-]+/g, ''));
    });

    // Check if sorted in descending order (default)
    expect(amounts).toEqual([...amounts].sort((a, b) => b - a));

    // Click again to sort ascending
    fireEvent.click(amountHeader);
    const rowsAsc = screen.getAllByRole('row').slice(1);
    const amountsAsc = rowsAsc.map((row: HTMLElement) => {
      const amountCell = within(row).getByRole('cell', { name: /\$[\d,.]/ });
      return parseFloat(amountCell.textContent!.replace(/[^0-9.-]+/g, ''));
    });

    expect(amountsAsc).toEqual([...amountsAsc].sort((a, b) => a - b));
  });

  it('displays correct transaction types with appropriate styling', () => {
    render(<TransactionList transactions={mockTransactions} />);

    const creditBadge = screen.getByText('Credit');
    const debitBadges = screen.getAllByText('Debit');

    expect(creditBadge).toHaveClass('bg-green-100', 'text-green-800');
    expect(debitBadges[0]).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('formats currency values correctly', () => {
    render(<TransactionList transactions={mockTransactions} />);

    const salaryAmount = screen.getByText(/\$5,000.00/);
    const purchaseAmount = screen.getByText(/\$89.99/);

    expect(salaryAmount).toBeInTheDocument();
    expect(purchaseAmount).toBeInTheDocument();
  });

  it('shows mobile view on small screens', () => {
    // Mock window.innerWidth
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    render(<TransactionList transactions={mockTransactions} />);

    // Check if mobile cards are rendered
    const mobileCards = screen.getAllByRole('article', { hidden: true });
    expect(mobileCards).toHaveLength(mockTransactions.length);

    // Verify mobile layout content
    mockTransactions.forEach((transaction) => {
      const card = screen.getByText(transaction.description).closest('div');
      expect(card).toHaveClass('bg-white', 'border', 'rounded-lg');
    });
  });

  it('handles empty transaction list', () => {
    render(<TransactionList transactions={[]} />);
    const table = screen.getByRole('table');
    const rows = within(table).queryAllByRole('row');

    // Should only have header row
    expect(rows).toHaveLength(1);
  });
});
