import React from 'react';
import TransactionList from '../components/TransactionList';
import { useUserData } from '../hooks/useUserData';

const TransactionPage: React.FC = () => {
  const { userData, loading, error } = useUserData();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-10 w-10 md:h-16 md:w-16 border-t-4 border-b-4 border-blue-600 shadow-lg"></div>
  </div>;
  
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 md:px-6 md:py-4 rounded-lg shadow-md max-w-sm md:max-w-md lg:max-w-lg mx-4 transform hover:scale-105 transition-transform duration-200" role="alert">
      <span className="text-sm md:text-base lg:text-lg font-medium block sm:inline">Error: {error}</span>
    </div>
  </div>;
  
  if (!userData) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-gray-50 border-2 border-gray-300 text-gray-700 px-4 py-3 md:px-6 md:py-4 rounded-lg shadow-md max-w-sm md:max-w-md mx-4 transform hover:scale-105 transition-transform duration-200">
      <span className="text-sm md:text-base lg:text-lg font-medium">No data available</span>
    </div>
  </div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12 max-w-full md:max-w-7xl min-h-screen bg-white">
      <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 lg:p-8 transform hover:shadow-2xl transition-all duration-300">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6 md:mb-8 border-b-2 pb-3 md:pb-5 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Transactions
        </h1>
        <div className="overflow-x-auto -mx-4 md:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full px-4 md:px-6 lg:px-8">
            <TransactionList transactions={userData.transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;