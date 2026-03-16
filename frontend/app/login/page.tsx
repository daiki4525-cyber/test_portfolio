"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { login as apiLogin } from "@/src/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { user, login: authLogin } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // マウント確認
  useEffect(() => {
    console.log("[LoginPage] mounted");
    setMounted(true);
  }, []);

  // ログイン済み判定
  useEffect(() => {
    console.log("[LoginPage] user changed:", user);
    if (!mounted) return;
    if (user) {
      console.log("[LoginPage] already logged in → redirect /");
      router.replace("/");
    }
  }, [user, mounted, router]);

  if (!mounted) return null;

  const handleLogin = async () => {
    console.log("[handleLogin] start", email);
    setError("");

    if (!email || !password) {
      console.log("[handleLogin] 入力不足");
      setError("メールとパスワードを入力してください");
      return;
    }

    try {
      const loggedUser = await apiLogin(email, password);
      console.log("[handleLogin] apiLogin success", loggedUser);

      authLogin(loggedUser);
      console.log("[handleLogin] authLogin done → redirect /");
      router.push("/");
    } catch (err: any) {
      console.error("[handleLogin] ERROR", err);
      setError(err.message || "ログイン失敗");
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">ログイン</h1>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log("[input] email", e.target.value);
                }}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">パスワード</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log("[input] password", e.target.value);
                }}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              ログイン
            </button>

            {error && (
              <p className="text-red-500 mt-2">{error}</p>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
