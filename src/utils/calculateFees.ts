export interface CalculationResult {
  originalAmount: number;
  daysLate: number;
  interestAmount: number;
  dailyFeeAmount: number;
  totalAmount: number;
}

export function calculateFees(
  originalAmount: number,
  dueDate: Date,
  paymentDate: Date
): CalculationResult {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const daysLate = Math.max(0, Math.floor((paymentDate.getTime() - dueDate.getTime()) / oneDay));
  
  // Calculate months late (rounded up)
  const monthsLate = Math.ceil(daysLate / 30);
  
  // Interest: 2% per month
  const interestAmount = daysLate > 0 ? originalAmount * (0.02 * monthsLate) : 0;
  
  // Daily fee: 0.0333% per day
  const dailyFeeAmount = originalAmount * (0.0333 / 100) * daysLate;
  
  const totalAmount = originalAmount + interestAmount + dailyFeeAmount;
  
  return {
    originalAmount,
    daysLate,
    interestAmount,
    dailyFeeAmount,
    totalAmount,
  };
}