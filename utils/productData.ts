import { CartItem } from "@/types/cart";

export const products: CartItem[] = [
  // Food
  {
    id: '1',
    name: 'Classic Burger',
    price: 12.99,
    category: 'Food',
    image: '1745427023135-5250e409ae86',
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: 15.99,
    category: 'Food',
    image: '1702716059239-385baacdabdc',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    price: 9.99,
    category: 'Food',
    image: '1746211224437-8340316b288d',
  },
  {
    id: '4',
    name: 'Chicken Wings',
    price: 11.99,
    category: 'Food',
    image: '1766589221606-08bc21fa1acd',
  },
  {
    id: '5',
    name: 'Pasta Carbonara',
    price: 13.99,
    category: 'Food',
    image: '1633337474564-1d9478ca4e2e',
  },
  { id: '6', name: 'Fish & Chips', price: 14.99, category: 'Food', image: 'fish chips fried' },

  // Drinks
  {
    id: '7',
    name: 'Fresh Lemonade',
    price: 4.99,
    category: 'Drinks',
    image: 'lemonade glass fresh',
  },
  { id: '8', name: 'Iced Coffee', price: 5.99, category: 'Drinks', image: 'iced coffee cold' },
  {
    id: '9',
    name: 'Smoothie Bowl',
    price: 7.99,
    category: 'Drinks',
    image: 'smoothie bowl colorful',
  },
  { id: '10', name: 'Fresh Juice', price: 6.99, category: 'Drinks', image: 'orange juice fresh' },
  {
    id: '11',
    name: 'Chocolate Shake',
    price: 6.49,
    category: 'Drinks',
    image: '1577805947697-89e18249d767',
  },

  // Desserts
  {
    id: '12',
    name: 'Chocolate Cake',
    price: 6.99,
    category: 'Desserts',
    image: '1771415788844-f20f43b984d9',
  },
  {
    id: '13',
    name: 'Ice Cream',
    price: 4.99,
    category: 'Desserts',
    image: '1592864042311-a3babede6944',
  },
  {
    id: '14',
    name: 'Cheesecake',
    price: 7.99,
    category: 'Desserts',
    image: '1636743714287-2b168cafb765',
  },
  {
    id: '15',
    name: 'Tiramisu',
    price: 8.99,
    category: 'Desserts',
    image: '1710106519622-8c49d0bcff2f',
  },

  // Snacks
  {
    id: '16',
    name: 'French Fries',
    price: 4.99,
    category: 'Snacks',
    image: '1661081090290-9b66fd49d882',
  },
  {
    id: '17',
    name: 'Nachos',
    price: 7.99,
    category: 'Snacks',
    image: '1619604107617-d46fffad3ccb',
  },
  {
    id: '18',
    name: 'Onion Rings',
    price: 5.99,
    category: 'Snacks',
    image: '1766589152188-54bd12a5c71b',
  },
];

export const categories = ['All', 'Food', 'Drinks', 'Desserts', 'Snacks'];

export const themeColors = [
  {
    name: 'Purple',
    from: 'from-purple-500',
    to: 'to-purple-700',
    bg: 'bg-purple-600',
    hover: 'hover:bg-purple-700',
    light: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  {
    name: 'Blue',
    from: 'from-blue-500',
    to: 'to-blue-700',
    bg: 'bg-blue-600',
    hover: 'hover:bg-blue-700',
    light: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  {
    name: 'Emerald',
    from: 'from-emerald-500',
    to: 'to-emerald-700',
    bg: 'bg-emerald-600',
    hover: 'hover:bg-emerald-700',
    light: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
  },
  {
    name: 'Rose',
    from: 'from-rose-500',
    to: 'to-rose-700',
    bg: 'bg-rose-600',
    hover: 'hover:bg-rose-700',
    light: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-200',
  },
  {
    name: 'Orange',
    from: 'from-orange-500',
    to: 'to-orange-700',
    bg: 'bg-orange-600',
    hover: 'hover:bg-orange-700',
    light: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
  },
  {
    name: 'Cyan',
    from: 'from-cyan-500',
    to: 'to-cyan-700',
    bg: 'bg-cyan-600',
    hover: 'hover:bg-cyan-700',
    light: 'bg-cyan-50',
    text: 'text-cyan-600',
    border: 'border-cyan-200',
  },
];
