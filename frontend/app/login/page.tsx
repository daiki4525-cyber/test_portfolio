"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");

    const handleLogin = async () => {
    try {
      const data = await login(email, password);
      setToken(data.token);
      setError("");
    } catch {
      setError("ログイン失敗");
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-6">
            ログイン
          </h1>

          <form className="space-y-4">
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

            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              ログイン
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            アカウントをお持ちでない方は新規登録
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
