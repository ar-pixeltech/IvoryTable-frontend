'use client';

import { Plus } from 'lucide-react';
import { themeColors } from '@/utils/productData';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/types/cart';

interface ProductCardProps {
  product: CartItem;
  theme: (typeof themeColors)[0];
}

export default function ProductCard({ product, theme }: ProductCardProps) {
  const { addToCart } = useCartStore();

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer active:scale-95 border border-gray-200 group"
      onClick={() => addToCart(product)}
    >
      <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={`https://images.unsplash.com/photo-${product.image}?auto=format&fit=crop&w=400&q=80`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div
          className={`absolute bottom-2 right-2 ${theme.bg} rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg`}
        >
          <Plus className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="p-2.5">
        <h3 className="font-semibold text-gray-800 mb-1 text-sm line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            {product.category}
          </span>
          <span className={`font-bold text-sm ${theme.text}`}>₹{product.price}</span>
        </div>
      </div>
    </div>
  );
}
