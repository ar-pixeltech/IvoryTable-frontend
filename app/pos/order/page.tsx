'use client';
import { useEffect, useState } from 'react';
import { CartItem, categories, Product, products, themeColors } from '@/utils/productData';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import CartPanel from './components/CartPanel';
import CheckoutModal from './components/CheckoutModal';
import AdjustmentModal from './components/AdjustmentModal';

export type AdjustmentType = 'percent' | 'amount';

export interface Adjustment {
  type: AdjustmentType;
  value: number;
  remark?: string;
}

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [themeIndex, setThemeIndex] = useState(0);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');
  const [discount, setDiscount] = useState<Adjustment | null>(null);
  const [tip, setTip] = useState<Adjustment | null>(null);
  const [activeModal, setActiveModal] = useState<'discount' | 'tip' | null>(null);

  const theme = themeColors[themeIndex];

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setShowCheckout(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const handleCheckout = () => {
    // Simulate payment processing
    setTimeout(() => {
      alert('Payment successful! Order confirmed.');
      clearCart();
    }, 1000);
  };

  useEffect(() => {
    if (cart.length === 0) {
      setDiscount(null);
      setTip(null);
    }
  }, [cart.length]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
  const total = subtotal + tax;
  const finalTotal = discountedSubtotal + tax + tipAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        theme={theme}
        themeIndex={themeIndex}
        setThemeIndex={setThemeIndex}
        showThemePicker={showThemePicker}
        setShowThemePicker={setShowThemePicker}
        currentTime={currentTime}
      />
      <div className="flex h-[calc(100vh-73px)]">
        <ProductGrid
          products={filteredProducts}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAdd={addToCart}
          theme={theme}
        />
        {/* Right Panel - Cart */}
        <CartPanel
          cart={cart}
          theme={theme}
          subtotal={subtotal}
          tax={tax}
          finalTotal={finalTotal}
          discount={discount}
          tip={tip}
          discountAmount={discountAmount}
          tipAmount={tipAmount}
          setActiveModal={setActiveModal}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          setShowCheckout={setShowCheckout}
        />
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          theme={theme}
          total={total}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onClose={() => setShowCheckout(false)}
          onConfirm={handleCheckout}
        />
      )}
      {activeModal && (
        <AdjustmentModal
          title={activeModal === 'discount' ? 'Discount' : 'Tip'}
          initialValue={activeModal === 'discount' ? discount : tip}
          onSave={(val) => {
            if (activeModal === 'discount') setDiscount(val);
            else setTip(val);
            setActiveModal(null);
          }}
          onRemove={() => {
            if (activeModal === 'discount') setDiscount(null);
            else setTip(null);
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
