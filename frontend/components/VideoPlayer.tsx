import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;   // YouTube 動画ID（例: "tPY-_4fC1j8"）
  isLive: boolean;
}

export function VideoPlayer({ videoId, isLive }: VideoPlayerProps) {
  const [showControls, setShowControls] = useState(false);

  return (
    <div
      className="relative bg-black aspect-video w-full group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* YouTube 埋め込み映像 */}
      {videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
          title="配信映像"
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        /* videoId がない場合のフォールバック */
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-500/40 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            </div>
            <p className="text-gray-400">配信中の映像</p>
          </div>
        </div>
      )}

      {/* Live Badge */}
      {isLive && (
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm">ライブ</span>
          </div>
        </div>
      )}
    </div>
  );
}