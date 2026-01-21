export function StreamInfo() {
  return (
    <div className="bg-gray-900 border-b border-gray-800 p-3">
      <div className="max-w-4xl">
        {/* Stream Title */}
        <h2 className="mb-2">
          ゲーム実況配信 - 新作RPGを初見プレイ！
        </h2>

        {/* Streamer Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span>配</span>
          </div>
          <div>
            <p className="text-sm">配信者名</p>
            <p className="text-xs text-gray-400">チャンネル登録者数 45.2K</p>
          </div>
          <button className="ml-auto bg-red-600 hover:bg-red-700 px-6 py-2 rounded transition-colors">
            登録
          </button>
        </div>
      </div>
    </div>
  );
}