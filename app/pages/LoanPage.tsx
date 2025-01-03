import React from 'react';
import LoanOverview from '../components/LoanOverview';
import { useUserData } from '../hooks/useUserData';

const LoanPage: React.FC = () => {
  const { userData, loading, error } = useUserData();

  if (loading) return <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  
  if (error) return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">Error: {error}</span>
    </div>
  </div>;
  
  if (!userData) return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative">
      No data available
    </div>
  </div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 transition-all">Loans</h1>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <LoanOverview 
            activeLoan={userData.activeLoan} 
            loans={userData.loans} 
          />
        </div>
      </div>
    </div>
  );
};

export default LoanPage;