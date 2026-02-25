'use client';

import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/utils/productData';

interface Props {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  onAdd: (p: Product) => void;
  theme: any;
}

export default function ProductGrid({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onAdd,
  theme,
}: Props) {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
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

      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap active:scale-95 ${
                selectedCategory === category
                  ? `${theme.bg} text-white shadow-md`
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} theme={theme} />
        ))}
      </div>
    </div>
  );
}
