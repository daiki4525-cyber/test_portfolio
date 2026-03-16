import { useRef } from 'react';
import { Send, SmilePlus } from 'lucide-react';

interface ChatPanelProps {
  videoId?: string;
}

export function ChatPanel({ videoId }: ChatPanelProps) {
  return (
    <div className="h-full flex flex-col w-full"   >

      {/* Chat Header */}
      <div className="pl-4 pr-2 py-3 border-b border-gray-800 flex-shrink-0">
        <h2>ライブチャット</h2>
      </div>

      {/* YouTube ライブチャット埋め込み */}
      <div className="flex-1 overflow-hidden">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=localhost`}
            title="ライブチャット"
            className="w-full h-full border-0"
            allow="autoplay"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            チャットを読み込めませんでした
          </div>
        )}
      </div>

    </div>
  );
}