import { CartStore } from '@/types/cart';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      discount: null,
      tip: null,

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      updateQuantity: (id, delta) =>
        set((state) => {
          const updated = state.cart
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
            .filter((i) => i.quantity > 0);

          // Auto clear adjustments if cart empty
          if (updated.length === 0) {
            return { cart: [], discount: null, tip: null };
          }

          return { cart: updated };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const updated = state.cart.filter((i) => i.id !== id);

          if (updated.length === 0) {
            return { cart: [], discount: null, tip: null };
          }

          return { cart: updated };
        }),

      clearCart: () => set({ cart: [], discount: null, tip: null }),

      setDiscount: (val) => set({ discount: val }),
      setTip: (val) => set({ tip: val }),
      getTotals: () => {
        const { cart, discount, tip } = get();

        const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

        const discountAmount = discount
          ? discount.type === 'percent'
            ? subtotal * (Math.min(discount.value, 100) / 100)
            : Math.min(discount.value, subtotal)
          : 0;

        const discountedSubtotal = Math.max(0, subtotal - discountAmount);

        const tax = discountedSubtotal * 0.08;

        const tipAmount = tip
          ? tip.type === 'percent'
            ? (discountedSubtotal + tax) * (tip.value / 100)
            : tip.value
          : 0;

        const total = discountedSubtotal + tax + tipAmount;    

        return {
          subtotal,
          discountAmount,
          tax,
          tipAmount,
          total,
        };
      },
    }),
    {
      name: 'cart',
    }
  )
);
