import { Calculator } from 'lucide-react';
import { CalculationResult } from '../utils/calculateFees';
import { DiscountForm } from './DiscountForm';
import { useState } from 'react';

interface ResultCardProps {
  result: CalculationResult;
  onTotalUpdate: (newTotal: number) => void;
}

export function ResultCard({ result, onTotalUpdate }: ResultCardProps) {
  const [displayAmount, setDisplayAmount] = useState(result.totalAmount);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleDiscountApplied = (discountedAmount: number) => {
    setDisplayAmount(discountedAmount);
    onTotalUpdate(discountedAmount);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Resultado do Cálculo</h2>
      </div>
      
      <div className="grid gap-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Valor Original:</span>
          <span className="font-medium">{formatCurrency(result.originalAmount)}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Dias em Atraso:</span>
          <span className="font-medium">{result.daysLate} dias</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Multa 2%/mês:</span>
          <span className="font-medium text-red-600">{formatCurrency(result.interestAmount)}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Juros Diário:</span>
          <span className="font-medium text-red-600">{formatCurrency(result.dailyFeeAmount)}</span>
        </div>
        
        <div className="flex justify-between pt-4">
          <span className="text-lg font-semibold">Valor Total:</span>
          <span className="text-lg font-bold text-blue-600">{formatCurrency(displayAmount)}</span>
        </div>

        <DiscountForm 
          currentAmount={result.totalAmount} 
          onApplyDiscount={handleDiscountApplied}
        />
      </div>
    </div>
  );
}