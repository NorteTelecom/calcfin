import React from 'react';

interface DiscountFormProps {
  currentAmount: number;
  onApplyDiscount: (discountedAmount: number) => void;
}

export function DiscountForm({ currentAmount, onApplyDiscount }: DiscountFormProps) {
  const [discountPercentage, setDiscountPercentage] = React.useState<string>('');

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = parseFloat(discountPercentage) / 100;
    const discountedAmount = currentAmount * (1 - discount);
    onApplyDiscount(discountedAmount);
  };

  return (
    <form onSubmit={handleApplyDiscount} className="mt-4 p-4 border-t border-gray-200">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Desconto (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Recalcular
        </button>
      </div>
    </form>
  );
}