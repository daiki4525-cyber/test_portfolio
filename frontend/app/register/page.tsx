"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SignupPage() {
  const router = useRouter();

  // フォーム入力状態
  const [name, setName] = useState("");
  const [username, setUsername] =useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // エラーとロード状態
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 新規登録処理
  const handleSignup = async () => {
    setError("");

    // フロント側バリデーション
    if (!name || !username || !email || !password) {
      setError("すべての項目を入力してください");
      console.log("[signup validation] empty fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      console.log("[signup validation] password mismatch");
      return;
    }

    try {
      setLoading(true);
      console.log("[signup] sending request", { name, email });

      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.log("[signup error response]", data);
        throw new Error(data.message || "登録に失敗しました");
      }

      console.log("[signup success] redirecting to login");
      // 登録成功 → ログイン画面へ
      router.push("/login");
    } catch (err: any) {
      console.error("[signup error]", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-6">
            新規登録
          </h1>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* ユーザー名 */}
            <div>
              <label className="block text-sm font-medium mb-1">
                ユーザー名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  console.log("[input] name", e.target.value);
                }}
                className="w-full border rounded px-3 py-2"
                placeholder="登録名"
              />
            </div>

            {/* ニックネーム */}
            <div>
              <label className="block text-sm font-medium mb-1">
                ニックネーム
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  console.log("[input] name", e.target.value);
                }}
                className="w-full border rounded px-3 py-2"
                placeholder="ニックネーム"
              />
            </div>


            {/* メールアドレス */}
            <div>
              <label className="block text-sm font-medium mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log("[input] email", e.target.value);
                }}
                className="w-full border rounded px-3 py-2"
                placeholder="example@example.com"
              />
            </div>

            {/* パスワード */}
            <div>
              <label className="block text-sm font-medium mb-1">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log("[input] password", e.target.value);
                }}
                className="w-full border rounded px-3 py-2"
                placeholder="パスワード"
              />
            </div>

            {/* パスワード確認 */}
            <div>
              <label className="block text-sm font-medium mb-1">
                パスワード（確認）
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  console.log("[input] confirmPassword", e.target.value);
                }}
                className="w-full border rounded px-3 py-2"
                placeholder="確認用"
              />
            </div>

            {/* エラーメッセージ */}
            {error && (
              <p className="text-sm text-red-600 text-center">
                {error}
              </p>
            )}

            {/* 登録ボタン */}
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "登録中..." : "登録する"}
            </button>
          </form>

          {/* ログインリンク */}
          <p className="text-sm text-center text-gray-500 mt-4">
            すでにアカウントをお持ちの方は{" "}
            <span
              className="text-green-600 cursor-pointer hover:underline"
              onClick={() => {
                console.log("[navigate] go to login page");
                router.push("/login");
              }}
            >
              ログイン
            </span>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
