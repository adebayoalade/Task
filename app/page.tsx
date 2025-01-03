'use client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LoanOverview from './components/LoanOverview';
import TransactionList from './components/TransactionList';
import UserProfile from './components/UserProfile';
import { useUserData } from '../app/hooks/useUserData';


const Page: React.FC = () => {
  const { userData, loading, error } = useUserData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No data available</div>;

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route 
            path="/transactions" 
            element={
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h1>
                <TransactionList transactions={userData.transactions} />
              </div>
            } 
          />
          <Route 
            path="/loans" 
            element={
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Loans</h1>
                <LoanOverview activeLoan={userData.activeLoan} loans={userData.loans} />
              </div>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
                <UserProfile name={userData.name} email={userData.email} />
              </div>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Page;
