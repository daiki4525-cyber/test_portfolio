"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

const handleLogin = async () => {
  try {
    const data = await login(email, password);
    console.log("login success:", data);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setError("");
  } catch (err) {
    console.error("login error:", err);
    setError("ログイン失敗");
  }
};


  return (
    <>
    <Header />

    <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
            <h1>ログイン</h1>
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
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                ログイン
                </button>

                {token && (
                    <>
                    <p>✅ ログイン成功</p>
                    <pre style={{ wordBreak: "break-all" }}>{token}</pre>
                    </>
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
        
        <p className="text-sm text-center text-gray-500 mt-4">
            アカウントをお持ちでない方は新規登録
        </p>
    </main>

    <Footer />
    </>
  );
}
