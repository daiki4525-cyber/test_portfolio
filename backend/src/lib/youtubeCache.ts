// backend/src/lib/youtubeCache.ts

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class YouTubeCache {
  private store = new Map<string, CacheEntry<unknown>>();

  set<T>(key: string, data: T, ttlMs: number): void {
    this.store.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.data as T;
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

// シングルトン
export const youtubeCache = new YouTubeCache();

// TTL定数（変更しやすいよう一箇所に集約）
export const TTL = {
  LIVE_LIST: 3 * 60 * 1000,      // 3分  ← ライブ一覧（頻繁に変わる）
  VIDEO_DETAIL: 5 * 60 * 1000,   // 5分  ← タイトル・サムネイル
  CHANNEL_INFO: 60 * 60 * 1000,  // 1時間 ← チャンネル名・アイコン
  LIVE_CHAT_ID: 30 * 60 * 1000,  // 30分 ← liveChatId（配信中は不変）
};