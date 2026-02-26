'use client';

import { useCartStore } from '@/store/cartStore';
import { AdjustmentMethods, Adjustment, AdjustmentType } from '@/types/cart';
import { useState } from 'react';

interface Props {
  adjustmentType: AdjustmentMethods;
  onClose: () => void;
}

export default function AdjustmentModal({  adjustmentType, onClose }: Props) {

  const {
    discount,
    tip,
    setDiscount,
    setTip,
  } = useCartStore();

  const [type, setType] = useState<AdjustmentType>((adjustmentType === 'discount' ? discount?.type : tip?.type) || 'percent');
  const [value, setValue] = useState<number>((adjustmentType === 'discount' ? discount?.value : tip?.value) || 0);
  const [remark, setRemark] = useState<string>((adjustmentType === 'discount' ? discount?.remark : tip?.remark) || '');

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
          <h2 className="font-semibold">{adjustmentType}</h2>
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
          {adjustmentType && (
            <button onClick={() => {
              if(adjustmentType === 'discount'){
                setDiscount(null)
              }else{
                setTip(null)
              }
              onClose()
            }} className="flex-1 bg-red-100 text-red-600 py-2 rounded">
              Remove
            </button>
          )}

          <button
            onClick={() => {
              if(adjustmentType === 'discount'){
                setDiscount({ type, value, remark })
              }else{
                setTip({ type, value, remark })
              }
              onClose()
            }}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
