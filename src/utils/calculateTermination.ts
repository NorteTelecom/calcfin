export interface TerminationResult {
  monthsStayed: number;
  benefitAmount: number;
  contractLength: number;
  remainingMonths: number;
  terminationFee: number;
  equipmentReturned: boolean;
  onuValue: number;
  routerValue: number;
  totalEquipmentValue: number;
  totalAmount: number;
}

export function calculateTermination(
  monthsStayed: number,
  benefitAmount: number,
  contractLength: number = 12,
  equipmentReturned: boolean = true,
  onuValue: number = 0,
  routerValue: number = 0
): TerminationResult {
  const remainingMonths = Math.max(0, contractLength - monthsStayed);
  const monthlyBenefit = benefitAmount / contractLength;
  const terminationFee = monthlyBenefit * remainingMonths;
  const totalEquipmentValue = equipmentReturned ? 0 : (onuValue + routerValue);
  const totalAmount = terminationFee + totalEquipmentValue;

  return {
    monthsStayed,
    benefitAmount,
    contractLength,
    remainingMonths,
    terminationFee,
    equipmentReturned,
    onuValue,
    routerValue,
    totalEquipmentValue,
    totalAmount,
  };
}