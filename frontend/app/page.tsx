import { Header } from '@/components/Header';
import { StreamerCard } from '@/components/StreamerCard';
import { Footer } from '@/components/Footer';

export default function App() {
  const liveStreamers = [
    {
      id: 1,
      name: '美咲',
      imageUrl: 'https://images.unsplash.com/photo-1760551937537-a29dbbfab30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc4NzU1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      viewers: 1234,
      category: 'トーク・雑談',
      title: '今日のメイクについて語ろう！質問受付中✨',
    },
    {
      id: 2,
      name: 'さくら',
      imageUrl: 'https://images.unsplash.com/photo-1616325629936-99a9013c29c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBhc2lhbiUyMHdvbWFufGVufDF8fHx8MTc2Nzk0ODkzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      viewers: 856,
      category: 'メイク・美容',
      title: 'ナチュラルメイクのコツ教えます💄',
    },
    {
      id: 3,
      name: '麗華',
      imageUrl: 'https://images.unsplash.com/photo-1696489283182-0446be970e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc5NDg5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      viewers: 2156,
      category: 'ファッション',
      title: '春の新作コーデ紹介👗 一緒に選んでください！',
    },
    {
      id: 4,
      name: '優奈',
      imageUrl: 'https://images.unsplash.com/photo-1633443362894-227325b61ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3JvdXMlMjB3b21hbnxlbnwxfHx8fDE3Njc5NDg5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      viewers: 567,
      category: 'ライフスタイル',
      title: 'まったり雑談しましょ〜🌸 コメント待ってます',
    },
    {
      id: 8,
      name: '美優',
      imageUrl: 'https://images.unsplash.com/photo-1603258339703-9c33e0733e4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2Nzg0MjIzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      viewers: 1890,
      category: 'トーク・雑談',
      title: '深夜のまったり配信🌙',
    },
    {
      id: 9,
      name: 'あやの',
      imageUrl: 'https://images.unsplash.com/photo-1685703206731-0bcd26546754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc4NjI2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      viewers: 3421,
      category: 'メイク・美容',
      title: 'リクエストメイク配信🎨',
    },
  ];

  const waitingStreamers = [
    {
      id: 5,
      name: '彩花',
      imageUrl: 'https://images.unsplash.com/photo-1603258339703-9c33e0733e4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2Nzg0MjIzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      followers: 8500,
      category: 'トーク・雑談',
      title: '20時から配信予定！お楽しみに♪',
    },
    {
      id: 6,
      name: '瑞希',
      imageUrl: 'https://images.unsplash.com/photo-1685703206731-0bcd26546754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc4NjI2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      followers: 12300,
      category: 'メイク・美容',
      title: 'スキンケアルーティン紹介します💆‍♀️',
    },
    {
      id: 7,
      name: '莉子',
      imageUrl: 'https://images.unsplash.com/photo-1760551937537-a29dbbfab30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc4NzU1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      followers: 6700,
      category: 'ファッション',
      title: '次の配信で何着ようかな？リクエスト募集中🎀',
    },
    {
      id: 10,
      name: 'まりな',
      imageUrl: 'https://images.unsplash.com/photo-1616325629936-99a9013c29c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBhc2lhbiUyMHdvbWFufGVufDF8fHx8MTc2Nzk0ODkzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      followers: 15200,
      category: 'ライフスタイル',
      title: '18時から料理配信予定🍳',
    },
    {
      id: 11,
      name: 'ひかり',
      imageUrl: 'https://images.unsplash.com/photo-1696489283182-0446be970e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc5NDg5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      followers: 9800,
      category: 'トーク・雑談',
      title: '明日の12時から久しぶりの配信します！',
    },
    {
      id: 12,
      name: 'ゆい',
      imageUrl: 'https://images.unsplash.com/photo-1633443362894-227325b61ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3JvdXMlMjB3b21hbnxlbnwxfHx8fDE3Njc5NDg5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      followers: 11400,
      category: 'メイク・美容',
      title: '新作コスメレビュー配信予定💕',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 配信中セクション */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse" />
            <h2 className="text-3xl font-rounded bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: '"Rounded Mplus 1c", "M PLUS Rounded 1c", "Zen Maru Gothic", sans-serif' }}>
              配信中
            </h2>
            <span className="ml-2 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-full font-semibold">
              {liveStreamers.length}人
            </span>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {liveStreamers.map((streamer) => (
              <StreamerCard
                key={streamer.id}
                name={streamer.name}
                imageUrl={streamer.imageUrl}
                viewers={streamer.viewers}
                isLive={true}
                category={streamer.category}
                title={streamer.title}
              />
            ))}
          </div>
        </section>

        {/* 配信待機中セクション */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            <h2 className="text-3xl font-rounded bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent" style={{ fontFamily: '"Rounded Mplus 1c", "M PLUS Rounded 1c", "Zen Maru Gothic", sans-serif' }}>
              配信待機中
            </h2>
            <span className="ml-2 px-3 py-1 bg-gray-600 text-white text-sm rounded-full font-semibold">
              {waitingStreamers.length}人
            </span>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {waitingStreamers.map((streamer) => (
              <StreamerCard
                key={streamer.id}
                name={streamer.name}
                imageUrl={streamer.imageUrl}
                isLive={false}
                category={streamer.category}
                followers={streamer.followers}
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