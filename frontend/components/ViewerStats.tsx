import { Eye } from 'lucide-react';

interface ViewerStatsProps {
  viewerCount: number;
  isLive: boolean;
}

export function ViewerStats({ viewerCount, isLive }: ViewerStatsProps) {
  return (
    <div className="flex items-center gap-4">
      {isLive && (
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{viewerCount.toLocaleString()} 視聴中</span>
        </div>
      )}
    </div>
  );
}
