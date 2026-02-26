'use client';

import { useState } from 'react';
import { Adjustment, AdjustmentType } from '../page';

interface Props {
  title: string;
  initialValue: Adjustment | null;
  onSave: (val: Adjustment) => void;
  onRemove: () => void;
  onClose: () => void;
}

export default function AdjustmentModal({ title, initialValue, onSave, onRemove, onClose }: Props) {
  const [type, setType] = useState<AdjustmentType>(initialValue?.type || 'percent');
  const [value, setValue] = useState<number>(initialValue?.value || 0);
  const [remark, setRemark] = useState<string>(initialValue?.remark || '');

  const keypad = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '⌫'];

  const handleKey = (key: string) => {
    if (key === '⌫') {
      setValue(Number(String(value).slice(0, -1) || 0));
      return;
    }
    setValue(Number(String(value) + key));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:w-96 rounded-t-xl sm:rounded-xl p-4">
        <div className="flex justify-between mb-2">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setType('percent')}
            className={`flex-1 py-2 rounded ${
              type === 'percent' ? 'bg-black text-white' : 'border'
            }`}
          >
            %
          </button>
          <button
            onClick={() => setType('amount')}
            className={`flex-1 py-2 rounded ${
              type === 'amount' ? 'bg-black text-white' : 'border'
            }`}
          >
            ₹
          </button>
        </div>

        <div className="text-2xl font-bold text-center mb-3">
          {type === 'percent' ? `${value}%` : `₹${value}`}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {keypad.map((k) => (
            <button
              key={k}
              onClick={() => handleKey(k)}
              className="py-3 bg-gray-100 rounded text-lg active:scale-95"
            >
              {k}
            </button>
          ))}
        </div>

        <input
          placeholder="Remark (optional)"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="w-full border rounded p-2 mb-3 text-sm"
        />

        <div className="flex gap-2">
          {initialValue && (
            <button onClick={onRemove} className="flex-1 bg-red-100 text-red-600 py-2 rounded">
              Remove
            </button>
          )}

          <button
            onClick={() => onSave({ type, value, remark })}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
