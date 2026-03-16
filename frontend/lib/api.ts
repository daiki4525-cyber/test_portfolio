// フロント共通 API ラッパー
export async function apiFetch(path: string, options: RequestInit = {}) {
  return fetch("http://localhost:3001" + path, {
    ...options,
    credentials: "include", // Cookie 送信
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}

// ログイン関数
export async function login(email: string, password: string) {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    console.error("[apiLogin] login failed:", errData);
    throw new Error(errData.message || "Login failed");
  }

  const data = await res.json();
  return data.user;
}

export interface StreamData {
  id: string;
  title: string;
  description: string | null;  // ← 追加
  thumbnail: string | null;
  isLive: 0 | 1 | 2; // 0=終了, 1=配信中, 2=配信予定
  viewerCount: number;
  scheduledStartTime: string | null;
  source: "YOUTUBE" | "INTERNAL";
  channel: {
    id: number;
    name: string;
    avatarUrl: string | null;
  };
  user?: { id?: number; name: string; avatarUrl?: string | null;  } | null;
  createdAt: string;  // ← 追加
  
}

/**
 * 配信一覧を取得する
 */
export async function getStreams(): Promise<StreamData[]> {
  const res = await fetch("http://localhost:3001/api/streams");

  if (!res.ok) {
    throw new Error(`Failed to fetch streams: ${res.status}`);
  }

  const data = await res.json();
  // バックエンドは { streams: [...] } の形で返す
  return data.streams ?? data;
}