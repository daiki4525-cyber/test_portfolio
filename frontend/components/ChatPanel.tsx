import { useState, useEffect, useRef } from 'react';
import { Send, SmilePlus } from 'lucide-react';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  color: string;
}

const MOCK_MESSAGES: Omit<ChatMessage, 'id' | 'timestamp'>[] = [
  { username: '太郎', message: 'こんにちは！', color: '#3b82f6' },
  { username: 'さくら', message: '配信楽しみにしてました！', color: '#ec4899' },
  { username: 'ゲーマー123', message: 'すごい！', color: '#10b981' },
  { username: 'ミキ', message: '画質いいですね', color: '#f59e0b' },
  { username: 'リュウ', message: '応援してます！', color: '#8b5cf6' },
  { username: 'ユウコ', message: 'いいね！', color: '#06b6d4' },
  { username: 'ケンジ', message: '最高です', color: '#ef4444' },
];

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate incoming messages
  useEffect(() => {
    const addRandomMessage = () => {
      const mockMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
      const newMessage: ChatMessage = {
        ...mockMsg,
        id: Date.now().toString() + Math.random(),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
    };

    // Add initial messages
    const initialInterval = setInterval(() => {
      addRandomMessage();
    }, 500);

    setTimeout(() => {
      clearInterval(initialInterval);
      // Then add messages at a slower pace
      const ongoingInterval = setInterval(addRandomMessage, 3000);
      return () => clearInterval(ongoingInterval);
    }, 3500);

    return () => clearInterval(initialInterval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: 'あなた',
      message: inputValue,
      timestamp: new Date(),
      color: '#22c55e',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="pl-4 pr-2 py-3 border-b border-gray-800 flex-shrink-0">
        <h2>ライブチャット</h2>
      </div>

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto pl-4 pr-2 py-2 space-y-3"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span 
                className="text-sm"
                style={{ color: msg.color }}
              >
                {msg.username}
              </span>
              <span className="text-xs text-gray-500">
                {msg.timestamp.toLocaleTimeString('ja-JP', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            <p className="text-sm text-gray-200">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="pl-4 pr-2 py-4 border-t border-gray-800 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <button
            type="button"
            className="p-2 hover:bg-gray-800 rounded transition-colors"
          >
            <SmilePlus className="w-5 h-5 text-gray-400" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="メッセージを送信"
            className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputValue.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}