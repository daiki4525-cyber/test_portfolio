"use client";

import { useState, useEffect, useRef } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ChatPanel } from '@/components/ChatPanel';
import { StreamInfo } from '@/components/StreamInfo';
import { ViewerStats } from '@/components/ViewerStats';

export default function App() {
  const [isLive, setIsLive] = useState(true);
  const [viewerCount, setViewerCount] = useState(1247);

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 20) - 10;
        return Math.max(1000, prev + change);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-dvh bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <h1 className="text-red-500">LiveStream</h1>
          <ViewerStats viewerCount={viewerCount} isLive={isLive} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-screen-2xl mx-auto w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Side - Video and Info */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div className="flex-shrink-0 relative z-20">
              <VideoPlayer isLive={isLive} />
              <StreamInfo />
            </div>
          </div>

          {/* Right Side - Chat (PC only) */}
          <div className="hidden lg:flex bg-gray-900 border-l border-gray-800 w-[350px] overflow-hidden flex-shrink-0 relative z-10">
            <ChatPanel />
          </div>

          {/* Chat for Mobile */}
          <div className="flex lg:hidden bg-gray-900 border-t border-gray-800 flex-1 overflow-hidden w-full relative z-10">
            <ChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
}