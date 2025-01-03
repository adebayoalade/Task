'use client';

import React, { useEffect, useState } from 'react';
import { UserInfo } from '../../app/types';
import UserProfile from '../../app/components/UserProfile';
import AccountBalance from '../components/AccountBalance';
import TransactionList from '../components/TransactionList';
import { fetchUserData } from '../../app/services/api';
import LoanOverview from '../components/LoanOverview';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData();
        setUserData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-base sm:text-lg md:text-xl text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-base sm:text-lg md:text-xl text-red-600">{error || 'Something went wrong'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
                <UserProfile name={userData.name} email={userData.email} />
              </div>
              <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
                <AccountBalance balance={userData.accountBalance} />
              </div>
            </div>
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <div className="h-full transition-all duration-300 hover:transform hover:scale-[1.01]">
                <TransactionList transactions={userData.transactions} />
              </div>
            </div>
          </div>
          <div className="w-full transition-all duration-300 hover:transform hover:scale-[1.01]">
            <LoanOverview 
              activeLoan={userData.activeLoan} 
              loans={userData.loans} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;