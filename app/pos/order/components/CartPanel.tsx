'use client';

import { CartItem } from '@/utils/productData';
import { Minus, Plus, Trash2, CreditCard, ShoppingCart } from 'lucide-react';

interface CartPanelProps {
  cart: CartItem[];
  theme: any;
  subtotal: number;
  tax: number;
  total: number;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setShowCheckout: (val: boolean) => void;
}

export default function CartPanel({
  cart,
  theme,
  subtotal,
  tax,
  total,
  updateQuantity,
  removeFromCart,
  clearCart,
  setShowCheckout,
}: CartPanelProps) {
  return (
    <div className="w-80 bg-white shadow-xl flex flex-col border-l border-gray-200">
      {/* Cart Header */}
      <div className={`px-4 py-3 border-b ${theme.light}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className={`w-5 h-5 ${theme.text}`} />
            <h2 className="font-bold text-gray-800">Order</h2>
          </div>
          <span className={`${theme.text} text-sm font-semibold`}>{cart.length} items</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <ShoppingCart className="w-16 h-16 mb-2 opacity-20" />
            <p className="text-sm">Cart is empty</p>
          </div>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                    <p className={`${theme.text} font-bold text-sm`}>₹{item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 bg-white border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-all active:scale-90"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className={`w-7 h-7 ${theme.bg} ${theme.hover} text-white rounded-md flex items-center justify-center transition-all active:scale-90`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-bold text-gray-800 text-sm">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className="border-t px-4 py-3 bg-gray-50">
        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Subtotal</span>
            <span className="font-semibold flex item-center justify-center">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Tax (8%)</span>
            <span className="font-semibold">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
            <span>Total</span>
            <span className={theme.text}>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={clearCart}
            disabled={cart.length === 0}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm active:scale-95"
          >
            Clear Cart
          </button>
          <button
            onClick={() => setShowCheckout(true)}
            disabled={cart.length === 0}
            className={`w-full bg-gradient-to-r ${theme.from} ${theme.to} text-white py-2.5 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg text-sm active:scale-95`}
          >
            <CreditCard className="w-4 h-4" />
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
