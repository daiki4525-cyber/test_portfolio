"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function StreamerProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // 登録済みか
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const backendBaseUrl = "http://localhost:3001";
  const defaultAvatar = `${backendBaseUrl}/uploads/avatars/default.png`;

  // 認証チェック
  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
  }, [loading, user, router]);

  // 既存のChannel情報を取得
  useEffect(() => {
    if (!user) return;

    fetch(`${backendBaseUrl}/api/channels/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 404) return null; // 未登録
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data) => {
        if (!data?.channel) return;
        // 登録済み → フォームにセット
        setIsRegistered(true);
        setName(data.channel.name ?? "");
        setBio(data.channel.bio ?? "");
        setAvatarUrl(data.channel.avatarUrl ?? "");
      })
      .catch((err) => console.error("[streamer-profile] fetch error:", err));
  }, [user]);

  // 保存処理（新規 or 更新を自動判定）
  const handleSave = async () => {
    if (!name.trim()) {
      setError("チャンネル名は必須です");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (avatarFile) formData.append("avatar", avatarFile);

      const method = isRegistered ? "PUT" : "POST";

      const res = await fetch(`${backendBaseUrl}/api/channels/me`, {
        method,
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "保存に失敗しました");
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message ?? "保存に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  const resolvedAvatarUrl = avatarUrl
    ? `${backendBaseUrl}/${avatarUrl.replace(/^\//, "")}`
    : defaultAvatar;

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
          <h1 className="text-2xl font-bold text-center mb-2">
            {isRegistered ? "配信者プロフィール編集" : "配信者登録"}
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            {isRegistered
              ? "チャンネル情報を編集できます"
              : "チャンネルを作成してライブ配信を始めましょう"}
          </p>

          <form className="space-y-4">
            {/* アバター */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium mb-1">
                チャンネルアイコン
              </label>
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

            {/* チャンネル名 */}
            <div>
              <label className="block text-sm font-medium mb-1">
                チャンネル名 <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例：○○チャンネル"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* 自己紹介 */}
            <div>
              <label className="block text-sm font-medium mb-1">
                チャンネル紹介
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="チャンネルの紹介文を入力してください"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="button"
              onClick={handleSave}
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "保存中..."
                : isRegistered
                ? "変更を保存"
                : "チャンネルを作成"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}