"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/**
 * LoginPopup コンポーネント
 * 未ログイン時にページ上部に表示するバナー
 * 使い方: <LoginPopup /> を表示したいページや layout に置くだけ
 */
export function LoginPopup() {
  const { user, loading } = useAuth();

  // 認証確認中はチラつき防止のため非表示
  if (loading) return null;

  // ログイン済みなら非表示
  if (user) return null;

  return (
    <div className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 px-6 flex items-center justify-between shadow-md">
      <div>
        <p className="font-semibold text-lg">ログインしてください</p>
        <p className="text-sm opacity-90">
          ログインすると配信への参加やコメントができます
        </p>
      </div>
      <Link
        href="/login"
        className="ml-4 bg-white text-pink-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        ログイン画面へ
      </Link>
    </div>
  );
}