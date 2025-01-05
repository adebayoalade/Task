'use client';

import React, { useState, useMemo } from 'react';
import { Transaction, SortField, SortDirection, TransactionFilter } from '../../app/types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filter, setFilter] = useState<TransactionFilter>('all');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (filter !== 'all') {
      result = result.filter(transaction => transaction.type === filter);
    }

    result.sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;

      switch (sortField) {
        case 'date':
          return (new Date(a.date).getTime() - new Date(b.date).getTime()) * modifier;
        case 'amount':
          return (a.amount - b.amount) * modifier;
        case 'type':
          return a.type.localeCompare(b.type) * modifier;
        default:
          return 0;
      }
    });

    return result;
  }, [transactions, sortField, sortDirection, filter]);

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="ml-1 transition-transform duration-200 ease-in-out">
      {sortField === field ? (
        sortDirection === 'asc' ? '↑' : '↓'
      ) : '↕'}
    </span>
  );

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-3 md:p-4 lg:p-6 transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="flex justify-center items-center py-4 md:py-6 lg:py-8">
          <p className="text-gray-500 text-base md:text-lg">No transactions found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-3 md:p-4 lg:p-6 transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 space-y-3 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 transition-colors duration-200">Recent Transactions</h2>
        <div className="w-full md:w-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as TransactionFilter)}
            className="w-full md:w-auto rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-all duration-200 hover:border-blue-400"
          >
            <option value="all">All Transactions</option>
            <option value="credit">Credits Only</option>
            <option value="debit">Debits Only</option>
          </select>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto -mx-3 md:-mx-4 lg:-mx-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  onClick={() => handleSort('date')}
                  className="px-4 md:px-6 py-2.5 md:py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors duration-200"
                >
                  Date
                  <SortIcon field="date" />
                </th>
                <th 
                  onClick={() => handleSort('type')}
                  className="px-4 md:px-6 py-2.5 md:py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors duration-200"
                >
                  Type
                  <SortIcon field="type" />
                </th>
                <th className="px-4 md:px-6 py-2.5 md:py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th 
                  onClick={() => handleSort('amount')}
                  className="px-4 md:px-6 py-2.5 md:py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors duration-200"
                >
                  Amount
                  <SortIcon field="amount" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 md:px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className={`px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-right N{
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden mt-4 md:mt-6 space-y-3 md:space-y-4">
        {filteredAndSortedTransactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="bg-white border rounded-lg md:rounded-xl p-3 md:p-4 space-y-2 md:space-y-3 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
              <span className={`inline-flex px-2 md:px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                transaction.type === 'credit' 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}>
                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
              </span>
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-900">{transaction.description}</p>
            <p className={`text-xs md:text-sm font-medium N{
              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'credit' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;