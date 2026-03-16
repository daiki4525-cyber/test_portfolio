"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { LoginPopup } from "@/components/LoginPopup";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Heart, Play, LogIn } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

export default function StreamDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [stream, setStream] = useState<any>(null);
  const [viewers, setViewers] = useState(0);

  // API取得
  useEffect(() => {
    async function fetchStream() {
      try {
        const res = await fetch(`http://localhost:3001/api/streams/${id}`);
        console.log("[StreamDetailPage] fetch status:", res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error("API error response:", text);
          return;
        }

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const text = await res.text();
          console.error("Not JSON:", text);
          return;
        }

        const data = await res.json();
        console.log("[StreamDetailPage] fetched data:", data);

        setStream(data);
        setViewers(data.viewerCount ?? 0);

        if (!data.user && !data.channel) {
          console.warn("[StreamDetailPage] ⚠️ user/channel情報がありません");
        }
      } catch (error) {
        console.error("[StreamDetailPage] fetch error:", error);
      }
    }

    if (id) fetchStream();
  }, [id]);

  // 視聴者数アニメーション（配信中のみ）
  useEffect(() => {
    if (!stream || stream.isLive !== 1) return;
    const timer = setInterval(() => {
      setViewers(prev => Math.max(0, prev + Math.floor(Math.random() * 5) - 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [stream]);

  if (!stream) return <div>Loading...</div>;

  const displayName = stream.user?.name ?? stream.channel?.name ?? "不明な配信者";
  const displayUsername = stream.user?.username ?? stream.channel?.name ?? "unknown";
  const displayBio = stream.description || stream.user?.bio || "自己紹介はありません";

  // 視聴ボタンのクリック処理
  const handleWatchClick = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(`/streams/${id}/live`);
    }
  };

  // 視聴ボタンの表示内容
  const renderWatchButton = () => {
    // 配信予定（isLive === 2）はボタン非表示
    if (stream.isLive === 2) return null;

    // 認証確認中はローディング表示
    if (authLoading) {
      return (
        <button
          disabled
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gray-700 text-gray-400 font-bold text-lg cursor-not-allowed"
        >
          読み込み中...
        </button>
      );
    }

    // 未ログイン
    if (!user) {
      return (
        <button
          onClick={handleWatchClick}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg transition-all"
        >
          <LogIn className="w-6 h-6" />
          ログインして視聴する
        </button>
      );
    }

    // ログイン済み・配信中
    return (
      <button
        onClick={handleWatchClick}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-lg transition-all shadow-lg hover:shadow-pink-500/30"
      >
        <Play className="w-6 h-6 fill-white" />
        視聴を開始する
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LoginPopup />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="relative w-full min-h-screen">

          {/* サムネイル */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative md:rounded-3xl overflow-hidden mb-6"
          >
            <div className="relative aspect-video">
              <ImageWithFallback
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              {/* 視聴者数（配信中のみ） */}
              {stream.isLive === 1 && (
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full">
                  <Users className="w-5 h-5 text-pink-300" />
                  <span className="text-white font-semibold">
                    {viewers.toLocaleString()}
                  </span>
                </div>
              )}

              {stream.isLive === 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-4xl font-bold text-white">まもなく開始</h2>
                </div>
              )}
            </div>
          </motion.div>

          {/* タイトル */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{stream.title}</h1>
            <p className="text-gray-500">{stream.source}</p>
          </div>

          {/* 視聴ボタン */}
          <div className="mb-6">
            {renderWatchButton()}
          </div>

          {/* 配信者情報 */}
          <div className="bg-gray-900 text-white rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold">{displayName}</h2>
                <p className="text-sm text-pink-400">@{displayUsername}</p>
              </div>
              <button className="flex items-center gap-2 bg-pink-600 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4" />
                フォロー
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-4">{displayBio}</p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}