export interface LiveVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelIcon?: string;
  description?: string;
  isLive: 0 | 1 | 2; // 0=終了, 1=配信中, 2=配信予定
  scheduledStartTime?: string;
  viewers?: number;
}

import { youtubeCache, TTL } from "./youtubeCache";

//指定チャンネルIDの配信中・配信予定を取得する
  export async function getLiveFromChannel(channelId: string): Promise<LiveVideo[]> {
  console.log("[youtube] API_KEY:", process.env.YOUTUBE_API_KEY?.slice(0, 8) + "...");
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const cacheKey = `live_list:${channelId}`;
  const cached = youtubeCache.get<LiveVideo[]>(cacheKey);

  if (cached) {
    console.log(`[cache] HIT ${cacheKey}`);
    return cached;
  }
  if (!API_KEY) {
    throw new Error("YOUTUBE_API_KEY が設定されていません");
  }

  // live と upcoming を並列で取得
  const [liveIds, upcomingIds] = await Promise.all([
    searchVideoIds(channelId, "live", API_KEY),
    searchVideoIds(channelId, "upcoming", API_KEY),
  ]);

  // 重複を除いてマージ
  const allIds = [...new Set([...liveIds, ...upcomingIds])];
  if (allIds.length === 0) return [];

  // Step2: videos API で詳細情報を取得（一度に50件まで）
  const results: LiveVideo[] = [];
  const CHUNK = 50;
  for (let i = 0; i < allIds.length; i += CHUNK) {
    const chunk = allIds.slice(i, i + CHUNK);
    const videos = await fetchVideoDetails(chunk, API_KEY);
    results.push(...videos);
  }

  youtubeCache.set(cacheKey, results, TTL.LIVE_LIST);
  console.log(`[cache] SET ${cacheKey} (${results.length}件, TTL:3分)`);


  return results.sort((a, b) => b.isLive - a.isLive);
}

//Search API で videoId リストを取得する
async function searchVideoIds(
  channelId: string,
  eventType: "live" | "upcoming",
  apiKey: string
): Promise<string[]> {
  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?part=id` +
    `&type=video` +
    `&channelId=${channelId}` +
    `&eventType=${eventType}` +
    `&maxResults=50` +
    `&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`[youtube] Search API エラー(${eventType}): ${res.status}`);
    return [];
  }

  const data = await res.json();
  return (data.items ?? []).map((item: any) => item.id.videoId).filter(Boolean);
}

// Videos API で詳細情報を取得して LiveVideo[] に整形する
async function fetchVideoDetails(
  videoIds: string[],
  apiKey: string
): Promise<LiveVideo[]> {
  const url =
    `https://www.googleapis.com/youtube/v3/videos` +
    `?part=snippet,liveStreamingDetails` +
    `&id=${videoIds.join(",")}` +
    `&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`[youtube] Videos API エラー: ${res.status}`);
    return [];
  }

  const data = await res.json();

  return (data.items ?? []).map((video: any): LiveVideo => {
    const liveDetails = video.liveStreamingDetails || {};
    let status: 0 | 1 | 2 = 0;

    if (liveDetails.actualStartTime && !liveDetails.actualEndTime) {
      status = 1; // 配信中
    } else if (!liveDetails.actualStartTime && liveDetails.scheduledStartTime) {
      status = 2; // 配信予定
    } else {
      status = 0; // 終了 or 通常動画
    }

    return {
      videoId: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails?.high?.url ?? "",
      channelTitle: video.snippet.channelTitle,
      channelIcon: video.snippet.thumbnails?.default?.url,
      description: video.snippet.description,
      isLive: status,
      scheduledStartTime: liveDetails.scheduledStartTime,
      viewers: liveDetails.concurrentViewers
        ? parseInt(liveDetails.concurrentViewers, 10)
        : 0,
    };
  });
}

// 複数チャンネルIDをまとめて取得してマージして返す
export async function getLiveFromChannels(
  channelIds: string[]
): Promise<LiveVideo[]> {
  const results = await Promise.allSettled(
    channelIds.map((id) => getLiveFromChannel(id))
  );

  const videos: LiveVideo[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      videos.push(...result.value);
    } else {
      console.error("[youtube] チャンネル取得エラー:", result.reason);
    }
  }

  // 配信中 → 配信予定 → 終了 の順にソート
  return videos.sort((a, b) => b.isLive - a.isLive);
}