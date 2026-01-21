"use client";

import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">test</span>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-pink-50 rounded-lg transition-colors"
          aria-label="メニュー"
        >
          <Menu className="w-6 h-6 text-pink-500" />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-pink-50 rounded-lg transition-colors text-gray-700">
                  ホーム
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-pink-50 rounded-lg transition-colors text-gray-700">
                  配信者一覧
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-pink-50 rounded-lg transition-colors text-gray-700">
                  ランキング
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-pink-50 rounded-lg transition-colors text-gray-700">
                  マイページ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}