import React from 'react';

interface AccountBalanceProps {
  balance: number;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ balance }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Balance</h2>
      <div className="text-3xl font-bold text-blue-600">
        N{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
};

export default AccountBalance; 