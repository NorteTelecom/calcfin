import React from 'react';
import { Calculator } from 'lucide-react';

interface TotalCalculationProps {
  latePaymentAmount: number | null;
  terminationAmount: number | null;
}

export function TotalCalculation({ latePaymentAmount, terminationAmount }: TotalCalculationProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!latePaymentAmount && !terminationAmount) return null;

  const total = (latePaymentAmount || 0) + (terminationAmount || 0);

  return (
    <div className="bg-blue-50 rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Valor Total a Pagar</h2>
      </div>
      
      <div className="grid gap-4">
        {latePaymentAmount && (
          <div className="flex justify-between py-2 border-b border-blue-200">
            <span className="text-gray-600">Boleto Vencido:</span>
            <span className="font-medium">{formatCurrency(latePaymentAmount)}</span>
          </div>
        )}
        
        {terminationAmount && (
          <div className="flex justify-between py-2 border-b border-blue-200">
            <span className="text-gray-600">Rescisão de Contrato:</span>
            <span className="font-medium">{formatCurrency(terminationAmount)}</span>
          </div>
        )}
        
        <div className="flex justify-between pt-4">
          <span className="text-lg font-semibold">Total Geral:</span>
          <span className="text-lg font-bold text-blue-600">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}