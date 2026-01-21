"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-6">
            新規登録
          </h1>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                ユーザー名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ユーザー名"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                パスワード（確認）
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              />
            </div>

            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              登録する
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            すでにアカウントをお持ちの方はログイン
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
