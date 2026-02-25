'use client';

import { Palette, ReceiptIndianRupee, User } from 'lucide-react';
import { themeColors } from '@/utils/productData';

interface HeaderProps {
  theme: any;
  themeIndex: number;
  setThemeIndex: (v: number) => void;
  showThemePicker: boolean;
  setShowThemePicker: (v: boolean) => void;
  currentTime: string;
}

export default function Header({
  theme,
  themeIndex,
  setThemeIndex,
  showThemePicker,
  setShowThemePicker,
  currentTime,
}: HeaderProps) {
  return (
    <header className={`bg-white shadow-sm border-b-2 ${theme.border}`}>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`${theme.bg} p-2 rounded-lg`}>
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
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color.from} ${color.to} transition-all hover:scale-110 active:scale-95 ${
                  themeIndex === index ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                }`}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
