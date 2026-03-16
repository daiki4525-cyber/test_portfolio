"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">LIVE</span>
          </div>
        </Link>

        {/* 右側 */}
        <div className="flex items-center gap-4">
          {/* 未ログイン時 */}
          {!user && (
            <>
              <Link
                href="/login"
                className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="text-sm px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                新規登録
              </Link>
            </>
          )}

          {/* メニュー */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-pink-50 rounded-lg transition-colors"
            aria-label="メニュー"
          >
            <Menu className="w-6 h-6 text-pink-500" />
          </button>
        </div>
      </div>

      {/* ドロップダウンメニュー */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-4 hover:bg-pink-50 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  ホーム
                </Link>
              </li>

                {/* 未ログイン時 */}
              {!user && (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block py-2 px-4 hover:bg-pink-50 rounded-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      ログイン
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/register"
                      className="block py-2 px-4 hover:bg-pink-50 rounded-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      新規登録
                    </Link>
                  </li>
                </>
              )}

              {user && (
                <>
                <li>
                  <Link
                    href="/StreamSetup"
                    className="block py-2 px-4 hover:bg-pink-50 rounded-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    配信する
                  </Link>
                </li>


                  <li>
                    <Link
                      href="/profile"
                      className="block py-2 px-4 hover:bg-pink-50 rounded-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      視聴者用マイページ
                    </Link>
                  </li>

                                    <li>
                    <Link
                      href="/streamer-profile"
                      className="block py-2 px-4 hover:bg-pink-50 rounded-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      配信者用マイページ
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-4 hover:bg-pink-50 rounded-lg text-red-500"
                    >
                      ログアウト
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
