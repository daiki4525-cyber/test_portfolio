import prisma from "../lib/prisma";
import { getLiveFromChannel, LiveVideo } from "../lib/youtube";

export interface StreamDto {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  source: "YOUTUBE" | "INTERNAL";
  isLive: 0 | 1 | 2;
  viewerCount: number;
  scheduledStartTime: string | null;
  channel: {
    id: number;
    name: string;
    avatarUrl: string | null;
  };
  user: { name: string; avatarUrl: string | null } | null;
  createdAt: string;
}

export async function getActiveStreams(): Promise<StreamDto[]> {
  const [youtubeStreams, internalStreams] = await Promise.all([
    getYouTubeStreams(),
    getInternalStreams(),
  ]);
  return [...youtubeStreams, ...internalStreams];
}

async function getYouTubeStreams(): Promise<StreamDto[]> {
  // TODO: YouTube API 有効化時はコメントを外す
  //return [];


  if (process.env.USE_MOCK === "true") {
    console.log("[streamService] MOCK MODE - YouTube APIスキップ");
    return [];
  }
  
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!channelId) {
    console.warn("[streamService] YOUTUBE_CHANNEL_ID が未設定です");
    return [];
  }

  try {
    const videos = await getLiveFromChannel(channelId);

    return videos
      .filter((v) => v.isLive !== 0)
      .map((v): StreamDto => ({
        id: v.videoId,
        title: v.title,
        description: v.description ?? null,
        thumbnail: v.thumbnail,
        source: "YOUTUBE",
        isLive: v.isLive,
        viewerCount: v.viewers ?? 0,
        scheduledStartTime: v.scheduledStartTime ?? null,
        channel: {
          id: 0,
          name: v.channelTitle,
          avatarUrl: v.channelIcon ?? null,
        },
        user: null,
        createdAt: new Date().toISOString(),
      }));
  } catch (err) {
    console.error("[streamService] YouTube取得エラー:", err);
    return [];
  }
  
}

async function getInternalStreams(): Promise<StreamDto[]> {
  const streams = await prisma.stream.findMany({
    where: { source: "INTERNAL" },
    include: { channel: true, User: true },
    orderBy: { createdAt: "desc" },
  });

  return streams.map((stream): StreamDto => ({
    id: String(stream.id),
    title: stream.title,
    description: stream.description ?? null,
    thumbnail: stream.thumbnail ?? null,
    source: "INTERNAL",
    isLive: 1,
    viewerCount: 0,
    scheduledStartTime: null,
    channel: {
      id: stream.channel.id,
      name: stream.channel.name,
      avatarUrl: stream.channel.avatarUrl ?? null,
    },
    user: stream.User
      ? { name: stream.User.name, avatarUrl: stream.User.avatarUrl ?? null }
      : null,
    createdAt: stream.createdAt.toISOString(),
  }));
}