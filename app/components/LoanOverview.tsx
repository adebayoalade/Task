'use client';
import React, { useState } from 'react';
import { Loan } from '../../app/types';
import LoanRequestForm from '../components/LoanRequestForm';
import { requestLoan } from '../../app/services/api';

interface LoanOverviewProps {
  activeLoan: Loan | null;
  loans: Loan[];
}

const LoanOverview: React.FC<LoanOverviewProps> = ({ activeLoan, loans }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLoanRequest = async (data: { amount: number; tenure: number; purpose: string }) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await requestLoan(data);
      setSuccess('Loan request submitted successfully!');
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800">Loan Overview</h2>
        {!activeLoan && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-black bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'Request New Loan'}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
          {success}
        </div>
      )}

      {showForm && !activeLoan ? (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Request New Loan</h3>
          <LoanRequestForm
            onSubmit={handleLoanRequest}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : (
        activeLoan && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Active Loan</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Remaining Amount</p>
                  <p className="text-lg font-semibold text-blue-600">
                    N{activeLoan.remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Payment</p>
                  <p className="text-lg font-semibold text-blue-600">
                    N{activeLoan.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Payment</p>
                  <p className="text-lg font-semibold text-blue-600">{activeLoan.nextPaymentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Interest Rate</p>
                  <p className="text-lg font-semibold text-blue-600">{activeLoan.interestRate}%</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* Loan History Section */}
      <div className="overflow-x-auto -mx-4 sm:-mx-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2 px-4 sm:px-6">Loan History</h3>
        <div className="inline-block min-w-full align-middle">
          <div className="space-y-4">
            {loans.map((loan) => (
              <div
                key={loan.id}
                className="border-b border-gray-200 pb-4 last:border-0 px-4 sm:px-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{loan.purpose}</p>
                    <p className="text-sm text-gray-500">
                      {loan.startDate} - {loan.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      N{loan.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <span className={`text-sm px-2 py-1 rounded ${
                      loan.status === 'completed' ? 'bg-green-100 text-green-800' :
                      loan.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanOverview;