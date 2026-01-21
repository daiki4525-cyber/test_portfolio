import { Eye, Heart } from 'lucide-react';

interface StreamerCardProps {
  name: string;
  imageUrl: string;
  viewers?: number;
  isLive: boolean;
  category?: string;
  followers?: number;
  title: string;
}

export function StreamerCard({ name, imageUrl, viewers, isLive, category, followers, title }: StreamerCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-pink-100">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* グラデーションオーバーレイ */}
        <div className={`absolute inset-0 ${isLive ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent' : 'bg-gradient-to-t from-black/60 via-black/20 to-black/20'}`} />
        
        {/* 待機中オーバーレイ */}
        {!isLive && (
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-gray-800 font-semibold text-sm">配信待機中</span>
            </div>
          </div>
        )}
        
        {/* ライブバッジ */}
        {isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}
        
        {/* 視聴者数 */}
        {isLive && viewers !== undefined && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-sm">
            <Eye className="w-3.5 h-3.5" />
            <span>{viewers.toLocaleString()}</span>
          </div>
        )}
        
        {/* 配信者名 */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-semibold truncate">{name}</h3>
          {category && (
            <p className="text-xs text-pink-200 truncate">{category}</p>
          )}
        </div>
      </div>
      
      {/* 配信タイトル - 写真の下 */}
      <div className="p-3 bg-white">
        <p className="text-sm text-gray-700 line-clamp-2 min-h-[2.5rem]">{title}</p>
        {!isLive && followers !== undefined && (
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
            <span>{followers.toLocaleString()} フォロワー</span>
          </div>
        )}
      </div>
    </div>
  );
}