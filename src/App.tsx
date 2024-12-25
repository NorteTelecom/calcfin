import React, { useState } from 'react';
import { Calculator, Calendar } from 'lucide-react';
import { calculateFees, CalculationResult } from './utils/calculateFees';
import { ResultCard } from './components/ResultCard';
import { TerminationForm } from './components/TerminationForm';
import { TotalCalculation } from './components/TotalCalculation';
import { TerminationResult } from './utils/calculateTermination';
import { TerminationResultCard } from './components/TerminationResultCard';

function App() {
  const [originalAmount, setOriginalAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [terminationResult, setTerminationResult] = useState<TerminationResult | null>(null);
  const [calculationType, setCalculationType] = useState<'fees' | 'termination'>('fees');
  const [currentLatePaymentTotal, setCurrentLatePaymentTotal] = useState<number | null>(null);
  const [currentTerminationTotal, setCurrentTerminationTotal] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const calculation = calculateFees(
      parseFloat(originalAmount),
      new Date(dueDate),
      new Date(paymentDate)
    );
    
    setResult(calculation);
    setCurrentLatePaymentTotal(calculation.totalAmount);
  };

  const handleTerminationResult = (result: TerminationResult) => {
    setTerminationResult(result);
    setCurrentTerminationTotal(result.totalAmount);
  };

  const handleLatePaymentTotalUpdate = (newTotal: number) => {
    setCurrentLatePaymentTotal(newTotal);
  };

  const handleTerminationTotalUpdate = (newTotal: number) => {
    setCurrentTerminationTotal(newTotal);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Calculator className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Calculadora Financeira Norte Telecom
          </h1>
          <p className="text-gray-600">
            Calcule juros de boletos vencidos e multas de rescisão
          </p>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 justify-center">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="calculationType"
                checked={calculationType === 'fees'}
                onChange={() => setCalculationType('fees')}
              />
              <span className="ml-2">Boleto Vencido</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="calculationType"
                checked={calculationType === 'termination'}
                onChange={() => setCalculationType('termination')}
              />
              <span className="ml-2">Rescisão de Contrato</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {calculationType === 'fees' ? (
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Original do Boleto
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={originalAmount}
                    onChange={(e) => setOriginalAmount(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Vencimento
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Pagamento
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Calcular Juros
              </button>
            </form>
          ) : (
            <TerminationForm onResultCalculated={handleTerminationResult} />
          )}
        </div>

        {calculationType === 'fees' && result && (
          <ResultCard 
            result={result} 
            onTotalUpdate={handleLatePaymentTotalUpdate}
          />
        )}

        {calculationType === 'termination' && terminationResult && (
          <TerminationResultCard 
            result={terminationResult}
            onTotalUpdate={handleTerminationTotalUpdate}
          />
        )}

        <TotalCalculation
          latePaymentAmount={currentLatePaymentTotal}
          terminationAmount={currentTerminationTotal}
        />
      </div>
    </div>
  );
}

export default App;