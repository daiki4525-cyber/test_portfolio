// frontend/src/hooks/useStreams.ts
import { useEffect, useState } from "react";
import { getStreams, StreamData } from "@/lib/api";

export function useStreams() {
  const [streams, setStreams] = useState<StreamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStreams() {
      try {
        setLoading(true);
        const data = await getStreams();
        if (!cancelled) setStreams(data);
      } catch (err) {
        if (!cancelled) setError("配信一覧の取得に失敗しました");
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStreams();

    // 3分ごとに自動更新（バックエンドのキャッシュTTLに合わせる）
    const timer = setInterval(fetchStreams, 3 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const liveStreams = streams.filter((s) => s.isLive === 1);
  const upcomingStreams = streams.filter((s) => s.isLive === 2);

  return { streams, liveStreams, upcomingStreams, loading, error };
}