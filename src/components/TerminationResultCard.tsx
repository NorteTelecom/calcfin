import { Calculator } from 'lucide-react';
import { TerminationResult } from '../utils/calculateTermination';
import { DiscountForm } from './DiscountForm';
import { useState } from 'react';

interface TerminationResultCardProps {
  result: TerminationResult;
  onTotalUpdate: (newTotal: number) => void;
}

export function TerminationResultCard({ result, onTotalUpdate }: TerminationResultCardProps) {
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
        <h2 className="text-xl font-semibold text-gray-800">Resultado da Rescisão</h2>
      </div>
      
      <div className="grid gap-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Meses de Permanência:</span>
          <span className="font-medium">{result.monthsStayed} meses</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Valor do Benefício:</span>
          <span className="font-medium">{formatCurrency(result.benefitAmount)}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Meses Restantes:</span>
          <span className="font-medium text-red-600">{result.remainingMonths} meses</span>
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Multa de Rescisão:</span>
          <span className="font-medium text-red-600">{formatCurrency(result.terminationFee)}</span>
        </div>
        
        {!result.equipmentReturned && (
          <>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Valor dos Equipamentos:</span>
              <span className="font-medium text-red-600">{formatCurrency(result.totalEquipmentValue)}</span>
            </div>
          </>
        )}
        
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