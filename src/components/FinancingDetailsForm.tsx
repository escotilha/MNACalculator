import React from 'react';
import { AnalysisFormData } from '../types/analysis';

interface Props {
  formData: AnalysisFormData;
  setFormData: React.Dispatch<React.SetStateAction<AnalysisFormData>>;
}

export function FinancingDetailsForm({ formData, setFormData }: Props) {
  const handleInterestRateChange = (newInterestRate: number) => {
    setFormData({
      ...formData,
      financingDetails: {
        ...formData.financingDetails,
        interestRate: newInterestRate,
        discountRate: Number((newInterestRate * 1.3).toFixed(1))
      }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Financing Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cash Component (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.financingDetails.cashComponent}
            onChange={(e) => {
              const cashComponent = Number(e.target.value);
              setFormData({
                ...formData,
                financingDetails: {
                  ...formData.financingDetails,
                  cashComponent,
                  debtComponent: 100 - cashComponent
                }
              });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Debt Component (%)</label>
          <input
            type="number"
            value={formData.financingDetails.debtComponent}
            onChange={(e) => {
              const debtComponent = Number(e.target.value);
              setFormData({
                ...formData,
                financingDetails: {
                  ...formData.financingDetails,
                  debtComponent,
                  cashComponent: 100 - debtComponent
                }
              });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
          <div className="relative mt-1">
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formData.financingDetails.interestRate}
              onChange={(e) => handleInterestRateChange(parseFloat(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-12"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Term (years)</label>
          <input
            type="number"
            min="1"
            max="30"
            value={formData.financingDetails.termYears}
            onChange={(e) => setFormData({ ...formData, financingDetails: { ...formData.financingDetails, termYears: parseInt(e.target.value) } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount Rate (%)
            <span className="ml-1 text-xs text-gray-500">Auto-set to 130% of Interest Rate</span>
          </label>
          <div className="relative mt-1">
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formData.financingDetails.discountRate}
              onChange={(e) => setFormData({ ...formData, financingDetails: { ...formData.financingDetails, discountRate: parseFloat(e.target.value) } })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-12"
              placeholder="e.g., 15.0"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <span className="font-medium">Note:</span> The discount rate is automatically set to 130% of the interest rate 
          to account for the equity risk premium. You can manually adjust it if needed.
        </p>
      </div>
    </div>
  );
}