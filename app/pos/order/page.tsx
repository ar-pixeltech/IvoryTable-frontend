'use client';
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Clock, IndianRupee, ReceiptIndianRupee, Palette, X, Check, Search, User, Menu } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
}

interface CartItem extends Product {
    quantity: number;
}

const products: Product[] = [
    // Food
    { id: '1', name: 'Classic Burger', price: 12.99, category: 'Food', image: 'burger meal' },
    { id: '2', name: 'Margherita Pizza', price: 15.99, category: 'Food', image: 'pizza margherita' },
    { id: '3', name: 'Caesar Salad', price: 9.99, category: 'Food', image: 'caesar salad fresh' },
    { id: '4', name: 'Chicken Wings', price: 11.99, category: 'Food', image: 'chicken wings crispy' },
    { id: '5', name: 'Pasta Carbonara', price: 13.99, category: 'Food', image: 'pasta carbonara creamy' },
    { id: '6', name: 'Fish & Chips', price: 14.99, category: 'Food', image: 'fish chips fried' },

    // Drinks
    { id: '7', name: 'Fresh Lemonade', price: 4.99, category: 'Drinks', image: 'lemonade glass fresh' },
    { id: '8', name: 'Iced Coffee', price: 5.99, category: 'Drinks', image: 'iced coffee cold' },
    { id: '9', name: 'Smoothie Bowl', price: 7.99, category: 'Drinks', image: 'smoothie bowl colorful' },
    { id: '10', name: 'Fresh Juice', price: 6.99, category: 'Drinks', image: 'orange juice fresh' },
    { id: '11', name: 'Milkshake', price: 6.49, category: 'Drinks', image: 'milkshake chocolate' },

    // Desserts
    { id: '12', name: 'Chocolate Cake', price: 6.99, category: 'Desserts', image: 'chocolate cake slice' },
    { id: '13', name: 'Ice Cream', price: 4.99, category: 'Desserts', image: 'ice cream cone' },
    { id: '14', name: 'Cheesecake', price: 7.99, category: 'Desserts', image: 'cheesecake strawberry' },
    { id: '15', name: 'Tiramisu', price: 8.99, category: 'Desserts', image: 'tiramisu dessert' },

    // Snacks
    { id: '16', name: 'French Fries', price: 4.99, category: 'Snacks', image: 'french fries crispy' },
    { id: '17', name: 'Nachos', price: 7.99, category: 'Snacks', image: 'nachos cheese' },
    { id: '18', name: 'Onion Rings', price: 5.99, category: 'Snacks', image: 'onion rings fried' },
];

const categories = ['All', 'Food', 'Drinks', 'Desserts', 'Snacks'];

const themeColors = [
    { name: 'Purple', from: 'from-purple-500', to: 'to-purple-700', bg: 'bg-purple-600', hover: 'hover:bg-purple-700', light: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    { name: 'Blue', from: 'from-blue-500', to: 'to-blue-700', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    { name: 'Emerald', from: 'from-emerald-500', to: 'to-emerald-700', bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', light: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
    { name: 'Rose', from: 'from-rose-500', to: 'to-rose-700', bg: 'bg-rose-600', hover: 'hover:bg-rose-700', light: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' },
    { name: 'Orange', from: 'from-orange-500', to: 'to-orange-700', bg: 'bg-orange-600', hover: 'hover:bg-orange-700', light: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    { name: 'Cyan', from: 'from-cyan-500', to: 'to-cyan-700', bg: 'bg-cyan-600', hover: 'hover:bg-cyan-700', light: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
];

export default function LandingPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [themeIndex, setThemeIndex] = useState(0);
    const [showThemePicker, setShowThemePicker] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');

    const theme = themeColors[themeIndex];

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prevCart => {
            return prevCart.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                    : item
            ).filter(item => item.quantity > 0);
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
        setShowCheckout(false);
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const handleCheckout = () => {
        // Simulate payment processing
        setTimeout(() => {
            alert('Payment successful! Order confirmed.');
            clearCart();
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Compact Header */}
            <header className={`bg-white shadow-sm border-b-2 ${theme.border}`}>
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`${theme.bg} rounded-lg p-2`}>
                            <ReceiptIndianRupee className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">Smoke Adda</h1>
                            <p className="text-xs text-gray-500">{currentTime}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <User className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                            onClick={() => setShowThemePicker(!showThemePicker)}
                            className={`p-2 ${theme.light} rounded-lg transition-all active:scale-95 ${theme.text}`}
                        >
                            <Palette className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Theme Picker Dropdown */}
                {showThemePicker && (
                    <div className="px-4 pb-3 pt-1">
                        <div className="flex gap-2 bg-white rounded-lg p-2 border">
                            {themeColors.map((color, index) => (
                                <button
                                    key={color.name}
                                    onClick={() => {
                                        setThemeIndex(index);
                                        setShowThemePicker(false);
                                    }}
                                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color.from} ${color.to} transition-all hover:scale-110 active:scale-95 ${themeIndex === index ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                                        }`}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <div className="flex h-[calc(100vh-73px)]">
                {/* Left Panel - Products */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {/* Search Bar */}
                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-gray-400 focus:outline-none bg-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-4">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap active:scale-95 ${selectedCategory === category
                                        ? `${theme.bg} text-white shadow-md`
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={addToCart}
                                theme={theme}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Panel - Cart */}
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
                                {cart.map(item => (
                                    <div key={item.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                                                <p className={`${theme.text} font-bold text-sm`}>${item.price.toFixed(2)}</p>
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
                                                ${(item.price * item.quantity).toFixed(2)}
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
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 text-sm">
                                <span>Tax (8%)</span>
                                <span className="font-semibold">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                                <span>Total</span>
                                <span className={theme.text}>${total.toFixed(2)}</span>
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
            </div>

            {/* Checkout Modal */}
            {showCheckout && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className={`bg-gradient-to-r ${theme.from} ${theme.to} text-white px-6 py-4 flex items-center justify-between`}>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-6 h-6" />
                                <h2 className="text-xl font-bold">Checkout</h2>
                            </div>
                            <button
                                onClick={() => setShowCheckout(false)}
                                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Order Summary */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {cart.map(item => (
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
                                        className={`p-4 rounded-lg border-2 transition-all active:scale-95 ${paymentMethod === 'card'
                                            ? `${theme.border} ${theme.light} ${theme.text} font-semibold`
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <CreditCard className="w-6 h-6 mx-auto mb-2" />
                                        <div className="text-sm">Card</div>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('cash')}
                                        className={`p-4 rounded-lg border-2 transition-all active:scale-95 ${paymentMethod === 'cash'
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
                                    <span className={`text-3xl font-bold ${theme.text}`}>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCheckout(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCheckout}
                                    className={`flex-1 bg-gradient-to-r ${theme.from} ${theme.to} text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2`}
                                >
                                    <Check className="w-5 h-5" />
                                    Confirm Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
    theme: typeof themeColors[0];
}

function ProductCard({ product, onAdd, theme }: ProductCardProps) {
    return (
        <div
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer active:scale-95 border border-gray-200 group"
            onClick={() => onAdd(product)}
        >
            <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                    src={`https://source.unsplash.com/400x300/?${encodeURIComponent(product.image)}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute bottom-2 right-2 ${theme.bg} rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg`}>
                    <Plus className="w-4 h-4 text-white" />
                </div>
            </div>
            <div className="p-2.5">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{product.category}</span>
                    <span className={`font-bold ${theme.text} text-sm`}>
                        ${product.price.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}