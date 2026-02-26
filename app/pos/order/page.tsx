'use client';
import { useState } from 'react';
import { categories, products, themeColors } from '@/utils/productData';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import CartPanel from './components/CartPanel';
import CheckoutModal from './components/CheckoutModal';
import AdjustmentModal from './components/AdjustmentModal';
import { useCartStore } from '@/store/cartStore';
import { AdjustmentMethods } from '@/types/cart';

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [themeIndex, setThemeIndex] = useState(0);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');
  const [activeModal, setActiveModal] = useState<AdjustmentMethods>(null);

  const theme = themeColors[themeIndex];

  const {
    clearCart,
  } = useCartStore();

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
      setShowCheckout(false);
    }, 1000);
  };

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
          theme={theme}
        />
        {/* Right Panel - Cart */}
        <CartPanel
          theme={theme}
          setActiveModal={setActiveModal}
          setShowCheckout={setShowCheckout}
        />
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          theme={theme}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onClose={() => setShowCheckout(false)}
          onConfirm={handleCheckout}
        />
      )}
      {activeModal && (
        <AdjustmentModal
          adjustmentType={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
