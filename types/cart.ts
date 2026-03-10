export type AdjustmentMethods = 'discount' | 'tip' | null;

export type AdjustmentType = 'percent' | 'amount';

export interface Adjustment {
  type: AdjustmentType;
  value: number;
  remark?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  image?: string;
}

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  tax: number;
  tipAmount: number;
  total: number;
}

export interface CartStore {
  cart: CartItem[];
  discount: Adjustment | null;
  tip: Adjustment | null;

  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  setDiscount: (val: Adjustment | null) => void;
  setTip: (val: Adjustment | null) => void;
  getTotals: () => CartTotals;
}
