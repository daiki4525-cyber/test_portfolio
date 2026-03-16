"use client";

/**
 * StreamSetup.tsx
 *
 * 変更点：
 * 1. useAuth("/login") で未ログイン時に /login へ自動リダイレクト
 * 2. ログイン確認後に GET /channels/me でチャンネル登録状況をチェック
 * 3. チャンネル未登録 → 登録案内画面を表示
 * 4. チャンネル登録済み → 配信設定フォームを表示
 * 5. localStorage は使わない（httpOnly Cookie で認証）
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Video,
  Info,
  Tag,
  Lock,
  Monitor,
  Smartphone,
  Tv2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Channel = {
  id: number;
  name: string;
};

type ChannelStatus = "loading" | "registered" | "unregistered" | "error";

export default function StreamSetup() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState("public");
  const [device, setDevice] = useState<"pc" | "mobile">("pc");

  const [channel, setChannel] = useState<Channel | null>(null);
  const [channelStatus, setChannelStatus] = useState<ChannelStatus>("loading");

  // 未ログイン時は /login へ自動リダイレクト
  const { user, loading } = useAuth("/login");

  // ログイン確認完了後にチャンネル登録状況を問い合わせる
  useEffect(() => {
    if (loading || !user) return;

    const checkChannel = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/channels/me", {
          credentials: "include", // httpOnly Cookie を自動送信
        });

        if (res.status === 401) {
          router.replace("/login");
          return;
        }

        if (!res.ok) {
          setChannelStatus("error");
          return;
        }

        const data = await res.json();
        console.log("[StreamSetup] channel:", data.channel);

        if (data.channel) {
          setChannel(data.channel);
          setChannelStatus("registered");
        } else {
          setChannelStatus("unregistered");
        }
      } catch (err) {
        console.error("[StreamSetup] checkChannel error:", err);
        setChannelStatus("error");
      }
    };

    checkChannel();
  }, [user, loading, router]);

  const categories = [
    { value: "gaming", label: "ゲーム" },
    { value: "music", label: "音楽" },
    { value: "talk", label: "雑談" },
    { value: "creative", label: "クリエイティブ" },
    { value: "education", label: "教育" },
    { value: "sports", label: "スポーツ" },
    { value: "cooking", label: "料理" },
    { value: "other", label: "その他" },
  ];

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleStartStream = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/streams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          source: "INTERNAL",
          categories: selectedCategories,
          privacy,
          device,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert("配信の作成に失敗しました");
        return;
      }
      alert("配信を開始しました！");
    } catch (err) {
      console.error("[handleStartStream] error:", err);
      alert("エラーが発生しました");
    }
  };

  // ================================================================
  // 描画分岐
  // ================================================================

  // 1. 認証確認中 or チャンネル確認中
  if (loading || channelStatus === "loading") {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm">読み込み中...</p>
        </div>
        <Footer />
      </>
    );
  }

  // 2. API エラー
  if (channelStatus === "error") {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
            <p className="text-gray-700 font-medium">チャンネル情報の取得に失敗しました</p>
            <p className="text-sm text-gray-400">時間をおいて再度お試しください</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-900 text-white rounded-xl text-sm hover:bg-gray-700 transition-colors"
            >
              再試行
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // 3. チャンネル未登録 → 登録案内画面
  if (channelStatus === "unregistered") {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Tv2 className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">チャンネルが未登録です</h1>
                  <p className="text-sm text-gray-500 mt-0.5">配信を始めるにはチャンネルの登録が必要です</p>
                </div>
              </div>
            </div>

            <div className="px-8 py-8 text-center space-y-4">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto">
                <Video className="w-10 h-10 text-pink-400" />
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                配信機能を利用するには、まずチャンネルを登録してください。
                <br />
                チャンネル名などを設定するだけで、すぐに配信が始められます。
              </p>
            </div>

            <div className="bg-gray-50 border-t border-gray-100 px-8 py-6 flex flex-col gap-3">
              <button
                onClick={() => router.push("/channel/register")}
                className="w-full px-8 py-4 text-base font-medium bg-pink-100 text-gray-900 rounded-xl hover:bg-pink-200 transition-all shadow-sm"
              >
                チャンネルを登録する
              </button>
              <button
                onClick={() => router.back()}
                className="w-full px-8 py-4 text-base font-medium text-gray-500 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all"
              >
                戻る
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // 4. チャンネル登録済み → 配信設定フォーム
  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 px-10 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Video className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">配信設定</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  配信を開始する前に情報を入力してください
                  {channel && (
                    <span className="ml-2 text-xs text-pink-500 font-medium">
                      チャンネル：{channel.name}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="px-10 py-8 space-y-8">

            {/* 配信タイトル */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Info className="w-4 h-4" />
                配信タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="配信のタイトルを入力"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                maxLength={100}
              />
              <p className="text-xs text-gray-400 mt-1.5">{title.length}/100</p>
            </div>

            {/* 配信デバイス */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Monitor className="w-4 h-4" />
                配信デバイス <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {(["pc", "mobile"] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDevice(d)}
                    className={`p-6 border-2 rounded-xl transition-all ${
                      device === d
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {d === "pc" ? (
                      <Monitor className={`w-8 h-8 mx-auto mb-3 ${device === "pc" ? "text-gray-900" : "text-gray-400"}`} />
                    ) : (
                      <Smartphone className={`w-8 h-8 mx-auto mb-3 ${device === "mobile" ? "text-gray-900" : "text-gray-400"}`} />
                    )}
                    <div className={`font-medium ${device === d ? "text-gray-900" : "text-gray-600"}`}>
                      {d === "pc" ? "PC" : "スマホ"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* カテゴリ */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Tag className="w-4 h-4" />
                カテゴリ <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 font-normal">（複数選択可）</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => toggleCategory(cat.value)}
                    className={`px-4 py-3 rounded-xl border-2 transition-all ${
                      selectedCategories.includes(cat.value)
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 公開設定 */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Lock className="w-4 h-4" />
                公開設定
              </label>
              <div className="space-y-2">
                {[
                  { value: "public", label: "公開", desc: "誰でも視聴できます" },
                  { value: "unlisted", label: "限定公開", desc: "リンクを知っている人のみ視聴できます" },
                  { value: "private", label: "非公開", desc: "自分だけが視聴できます" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <input
                      type="radio"
                      name="privacy"
                      value={opt.value}
                      checked={privacy === opt.value}
                      onChange={(e) => setPrivacy(e.target.value)}
                      className="w-4 h-4 text-gray-700 focus:ring-gray-400"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-t border-gray-100 px-10 py-8 flex items-center justify-center gap-6">
            <button
              className="w-80 px-8 py-5 text-lg font-medium text-gray-600 bg-white border-2 border-gray-200 rounded-xl hover:text-gray-900 hover:border-gray-300 transition-all"
              onClick={() => {
                setTitle("");
                setSelectedCategories([]);
                setPrivacy("public");
                setDevice("pc");
              }}
            >
              リセット
            </button>

            <button
              onClick={handleStartStream}
              disabled={!title || selectedCategories.length === 0}
              className="w-80 px-8 py-5 text-lg font-medium bg-pink-100 text-gray-900 rounded-xl hover:bg-pink-200 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              配信を開始
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}