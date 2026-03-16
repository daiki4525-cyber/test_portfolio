"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from "next/navigation";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import { VideoPlayer } from '@/components/VideoPlayer';
import { ChatPanel } from '@/components/ChatPanel';
import { ViewerStats } from '@/components/ViewerStats';

export default function StreamLivePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  
  const { user, loading: authLoading } = useAuthGuard();

  const [stream, setStream] = useState<any>(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(57);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (authLoading || !user) return;

    async function fetchStream() {
      try {
        const res = await fetch(`http://localhost:3001/api/streams/${id}`, {
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        console.log("[LivePage] stream:", data);
        setStream(data);
        setViewerCount(data.viewerCount ?? 0);
      } catch (err) {
        console.error("[StreamLivePage] fetch error:", err);
      }
    }

    if (id) fetchStream();
  }, [id, user, authLoading]);

  useEffect(() => {
    if (!stream || stream.isLive !== 1) return;
    const interval = setInterval(() => {
      setViewerCount(prev => Math.max(0, prev + Math.floor(Math.random() * 20) - 10));
    }, 3000);
    return () => clearInterval(interval);
  }, [stream?.isLive]);

  if (authLoading || !stream) {
    return (
      <div className="h-dvh bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-dvh bg-black text-white flex flex-col overflow-hidden">

      <header ref={headerRef} className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push(`/streams/${id}`)}
            className="text-gray-400 hover:text-white text-sm transition"
          >
            ← 詳細に戻る
          </button>
          <ViewerStats viewerCount={viewerCount} isLive={stream.isLive === 1} />
        </div>
      </header>

      <div className="flex-1 w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full w-full">

          {/* 動画エリア */}
          <div className="relative z-20 lg:flex-shrink-0">

            {/* PC用：高さ基準で16:9の幅 */}
            <div
              className="hidden lg:block"
              style={{
                height: `calc(100vh - ${headerHeight}px)`,
                width: `calc((100vh - ${headerHeight}px) * 16 / 9)`,
              }}
            >
              <VideoPlayer videoId={stream.id} isLive={stream.isLive === 1} />
            </div>

            {/* モバイル用：横幅基準で16:9の高さ */}
            <div className="lg:hidden w-full aspect-video">
              <VideoPlayer videoId={stream.id} isLive={stream.isLive === 1} />
            </div>

          </div>

          {/* チャット（PC）：残り幅を全て使う */}
          <div className="hidden lg:flex flex-1 flex-col bg-black border-l border-gray-800 overflow-hidden relative z-10">
            <ChatPanel videoId={stream.id} />
          </div>

          {/* チャット（モバイル） */}
          <div className="flex lg:hidden flex-1 flex-col bg-black border-t border-gray-800 overflow-hidden relative z-10">
            <ChatPanel videoId={stream.id} />
          </div>

        </div>
      </div>
    </div>
  );
}