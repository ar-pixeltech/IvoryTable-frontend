'use client';

import { useCartStore } from '@/store/cartStore';
import { CreditCard, IndianRupee, X, Check } from 'lucide-react';

export interface CheckoutModalProps {
  theme: any;
  paymentMethod: 'cash' | 'card';
  setPaymentMethod: (method: 'cash' | 'card') => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CheckoutModal({
  theme,
  paymentMethod,
  setPaymentMethod,
  onClose,
  onConfirm,
}: CheckoutModalProps) {
  const { cart, getTotals } = useCartStore();

  const { total } = getTotals();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div
          className={`bg-gradient-to-r ${theme.from} ${theme.to} text-white px-6 py-4 flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            <h2 className="text-xl font-bold">Checkout</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Order Summary */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} <span className="text-gray-400">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border-2 transition-all active:scale-95 ${
                  paymentMethod === 'card'
                    ? `${theme.border} ${theme.light} ${theme.text} font-semibold`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm">Card</div>
              </button>
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 rounded-lg border-2 transition-all active:scale-95 ${
                  paymentMethod === 'cash'
                    ? `${theme.border} ${theme.light} ${theme.text} font-semibold`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <IndianRupee className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm">Cash</div>
              </button>
            </div>
          </div>

          {/* Total Amount */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span className={`text-3xl font-bold ${theme.text}`}>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 bg-gradient-to-r ${theme.from} ${theme.to} text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2`}
            >
              <Check className="w-5 h-5" />
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
