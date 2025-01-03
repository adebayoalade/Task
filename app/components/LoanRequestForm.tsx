'use client';

import React, { useState } from 'react';
import { z } from 'zod';

const loanRequestSchema = z.object({
  amount: z.number().min(1000).max(50000),
  tenure: z.number().min(6).max(60),
  purpose: z.string().min(10).max(200),
});

type LoanRequest = z.infer<typeof loanRequestSchema>;

interface LoanRequestFormProps {
  onSubmit: (data: LoanRequest) => Promise<void>;
  isSubmitting: boolean;
}

const LoanRequestForm: React.FC<LoanRequestFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<Partial<LoanRequest>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof LoanRequest, string>>>({});

  const validateField = (field: keyof LoanRequest, value: any) => {
    try {
      loanRequestSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = Number(formData.amount);
    const tenure = Number(formData.tenure);
    const purpose = formData.purpose || '';

    const isValid = [
      validateField('amount', amount),
      validateField('tenure', tenure),
      validateField('purpose', purpose),
    ].every(Boolean);

    if (isValid) {
      await onSubmit({ amount, tenure, purpose });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Loan Amount ($)
        </label>
        <input
          type="number"
          value={formData.amount || ''}
          onChange={(e) => {
            const value = Number(e.target.value);
            setFormData(prev => ({ ...prev, amount: value }));
            validateField('amount', value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter amount (1,000 - 50,000)"
          min="1000"
          max="50000"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Loan Tenure (months)
        </label>
        <input
          type="number"
          value={formData.tenure || ''}
          onChange={(e) => {
            const value = Number(e.target.value);
            setFormData(prev => ({ ...prev, tenure: value }));
            validateField('tenure', value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter tenure (6-60 months)"
          min="6"
          max="60"
        />
        {errors.tenure && (
          <p className="mt-1 text-sm text-red-600">{errors.tenure}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Loan Purpose
        </label>
        <textarea
          value={formData.purpose || ''}
          onChange={(e) => {
            const value = e.target.value;
            setFormData(prev => ({ ...prev, purpose: value }));
            validateField('purpose', value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe the purpose of your loan"
          rows={3}
        />
        {errors.purpose && (
          <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        {isSubmitting ? 'Submitting...' : 'Request Loan'}
      </button>
    </form>
  );
};

export default LoanRequestForm; 