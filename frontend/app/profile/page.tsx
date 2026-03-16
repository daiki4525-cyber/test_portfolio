"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [error, setError] = useState("");

  const backendBaseUrl = "http://localhost:3001/";
  const defaultAvatar = `${backendBaseUrl}uploads/avatars/default.png`;

  // 認証チェック（loadingが終わってからuserを確認）
  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("[auth] ユーザー未ログイン → ログイン画面へ");
      router.replace("/login");
    }
  }, [loading, user, router]);

  // useAuthで取得したユーザー情報をフォームにセット（二重fetchなし）
  useEffect(() => {
    if (!user) return;
    console.log("[profile] ユーザー情報セット", user);
    setName(user.name ?? "");
    setEmail(user.email ?? "");
    setBio(user.bio ?? "");
    setAvatarUrl(user.avatarUrl ?? "");
  }, [user]);

  // 保存処理
  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("bio", bio);
      if (password) formData.append("password", password);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await fetch(`${backendBaseUrl}users/me`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      console.log("[save] 更新成功 → 完了ページへ");
      router.push("/complete");
    } catch (err) {
      console.error("[save] 更新エラー", err);
      setError("更新に失敗しました");
    }
  };

  // アバターURL解決
  const resolvedAvatarUrl = avatarUrl
    ? `${backendBaseUrl.replace(/\/$/, "")}/${avatarUrl.replace(/^\//, "")}`
    : defaultAvatar;

  // ローディング表示
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p>読み込み中...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-6">
            視聴者用会員情報編集
          </h1>

          <form className="space-y-4">
            {/* アバター */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium mb-1">アイコン画像</label>
              <div className="w-24 h-24 mb-2">
                <img
                  src={avatarPreview || resolvedAvatarUrl}
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover border"
                  onError={(e) => { e.currentTarget.src = defaultAvatar; }}
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setAvatarFile(file);
                  setAvatarPreview(URL.createObjectURL(file));
                }}
              />
            </div>

            {/* ユーザー名 */}
            <div>
              <label className="block text-sm font-medium mb-1">ユーザー名</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* メール */}
            <div>
              <label className="block text-sm font-medium mb-1">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* 自己紹介 */}
            <div>
              <label className="block text-sm font-medium mb-1">自己紹介</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <hr />

            {/* パスワード */}
            <div>
              <label className="block text-sm font-medium mb-1">新しいパスワード</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">新しいパスワード（確認）</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              変更を保存
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}