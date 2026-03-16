'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StreamerCard } from "@/components/StreamerCard";
import { LoginPopup } from "@/components/LoginPopup";
import { useStreams } from "@/src/hooks/useStreams";  // ← 追加

export default function App() {
  const { liveStreams, upcomingStreams, loading } = useStreams();  // ← これだけ

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LoginPopup />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 配信中 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse" />
            <h2 className="text-3xl font-rounded bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              配信中
            </h2>
            <span className="ml-2 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-full font-semibold">
              {liveStreams.length}人
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {liveStreams.map((streamer) => (
              <StreamerCard
                key={streamer.id}
                href={`/streams/${streamer.id}`}
                id={streamer.id}
                name={streamer.user?.name ?? "YouTube"}
                imageUrl={streamer.thumbnail ?? "/default.png"}
                viewers={streamer.viewerCount ?? 0}
                isLive={true}
                category={streamer.source ?? "YOUTUBE"}
                title={streamer.title}
              />
            ))}
          </div>
        </section>

        {/* 配信予定 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            <h2 className="text-3xl font-rounded bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              配信予定
            </h2>
            <span className="ml-2 px-3 py-1 bg-gray-600 text-white text-sm rounded-full font-semibold">
              {upcomingStreams.length}人
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {upcomingStreams.map((streamer) => (
              <StreamerCard
                key={streamer.id}
                id={streamer.id}
                name={streamer.user?.name ?? "YouTube"}
                imageUrl={streamer.thumbnail ?? "/default.png"}
                isLive={false}
                category={streamer.source ?? "YOUTUBE"}
                title={streamer.title}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}