export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-white mb-3">Glamour Live について</h3>
            <p className="text-sm text-gray-300">
              女性配信者による上質なライブ配信プラットフォーム
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-3">リンク</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-pink-400 transition-colors">利用規約</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">お問い合わせ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-3">配信者になる</h3>
            <p className="text-sm text-gray-300 mb-3">
              あなたも配信してみませんか？
            </p>
            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-sm hover:shadow-lg transition-shadow">
              配信者登録
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          © 2026 Glamour Live. All rights reserved.
        </div>
      </div>
    </footer>
  );
}