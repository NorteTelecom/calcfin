import React from 'react';

interface EquipmentFormProps {
  equipmentReturned: boolean;
  onuValue: string;
  routerValue: string;
  onEquipmentReturnedChange: (value: boolean) => void;
  onOnuValueChange: (value: string) => void;
  onRouterValueChange: (value: string) => void;
}

export function EquipmentForm({
  equipmentReturned,
  onuValue,
  routerValue,
  onEquipmentReturnedChange,
  onOnuValueChange,
  onRouterValueChange,
}: EquipmentFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">
          Equipamentos Devolvidos:
        </label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              checked={equipmentReturned}
              onChange={() => onEquipmentReturnedChange(true)}
            />
            <span className="ml-2">Sim</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              checked={!equipmentReturned}
              onChange={() => onEquipmentReturnedChange(false)}
            />
            <span className="ml-2">Não</span>
          </label>
        </div>
      </div>

      {!equipmentReturned && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ONU
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                R$
              </span>
              <input
                type="number"
                step="0.01"
                value={onuValue}
                onChange={(e) => onOnuValueChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="199,99"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Roteador
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                R$
              </span>
              <input
                type="number"
                step="0.01"
                value={routerValue}
                onChange={(e) => onRouterValueChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="235,00"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}