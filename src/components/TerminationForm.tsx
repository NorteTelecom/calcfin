import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { calculateTermination, TerminationResult } from '../utils/calculateTermination';
import { TerminationResultCard } from './TerminationResultCard';
import { EquipmentForm } from './EquipmentForm';

interface TerminationFormProps {
  onResultCalculated: (result: TerminationResult) => void;
}

export function TerminationForm({ onResultCalculated }: TerminationFormProps) {
  const [monthsStayed, setMonthsStayed] = useState('');
  const [benefitAmount, setBenefitAmount] = useState('650');
  const [contractLength, setContractLength] = useState('12');
  const [equipmentReturned, setEquipmentReturned] = useState(true);
  const [onuValue, setOnuValue] = useState('199.99');
  const [routerValue, setRouterValue] = useState('235.00');
  const [result, setResult] = useState<TerminationResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const calculation = calculateTermination(
      parseInt(monthsStayed),
      parseFloat(benefitAmount),
      parseInt(contractLength),
      equipmentReturned,
      parseFloat(onuValue),
      parseFloat(routerValue)
    );
    setResult(calculation);
    onResultCalculated(calculation);
  };

  return (
    <div>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meses de Permanência
          </label>
          <input
            type="number"
            required
            value={monthsStayed}
            onChange={(e) => setMonthsStayed(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor do Benefício
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              R$
            </span>
            <input
              type="number"
              step="0.01"
              required
              value={benefitAmount}
              onChange={(e) => setBenefitAmount(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="650,00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Período de Fidelidade (meses)
          </label>
          <input
            type="number"
            required
            value={contractLength}
            onChange={(e) => setContractLength(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="12"
          />
        </div>

        <EquipmentForm
          equipmentReturned={equipmentReturned}
          onuValue={onuValue}
          routerValue={routerValue}
          onEquipmentReturnedChange={setEquipmentReturned}
          onOnuValueChange={setOnuValue}
          onRouterValueChange={setRouterValue}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Calcular Rescisão
        </button>
      </form>

      {result && <TerminationResultCard result={result} />}
    </div>
  );
}