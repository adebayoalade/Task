import React from 'react';
import TransactionList from '../components/TransactionList';
import { useUserData } from '../hooks/useUserData';

const TransactionPage: React.FC = () => {
  const { userData, loading, error } = useUserData();

  if (loading) return <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  
  if (error) return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 md:px-4 md:py-3 rounded relative max-w-sm md:max-w-md lg:max-w-lg mx-4" role="alert">
      <span className="text-sm md:text-base block sm:inline">Error: {error}</span>
    </div>
  </div>;
  
  if (!userData) return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-gray-100 border border-gray-400 text-gray-700 px-3 py-2 md:px-4 md:py-3 rounded relative max-w-sm md:max-w-md mx-4">
      <span className="text-sm md:text-base">No data available</span>
    </div>
  </div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8 max-w-full md:max-w-7xl">
      <div className="bg-white rounded-lg shadow-lg p-3 md:p-4 lg:p-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 border-b pb-2 md:pb-4">
          Transactions
        </h1>
        <div className="overflow-x-auto -mx-3 md:-mx-4 lg:-mx-6">
          <div className="inline-block min-w-full px-3 md:px-4 lg:px-6">
            <TransactionList transactions={userData.transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;