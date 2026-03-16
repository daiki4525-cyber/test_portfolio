import prisma from "../lib/prisma";
import { getLiveFromChannel, LiveVideo } from "../lib/youtube";

export async function syncYouTubeStreams(channelIds: string[]): Promise<void> {
  if (channelIds.length === 0) return;

  console.log(`[youtubeSync] 同期開始: ${channelIds.length}チャンネル`);

  const allVideos: LiveVideo[] = [];
  for (const channelId of channelIds) {
    const videos = await getLiveFromChannel(channelId);
    allVideos.push(...videos);
  }

  // 終了済みをスキップ（配信中=1 と 配信予定=2 のみ処理）
  const activeVideos = allVideos.filter((v) => v.isLive !== 0);

  console.log(
    `[youtubeSync] 対象動画: ${activeVideos.length}件（全${allVideos.length}件中）`
  );

  for (const video of activeVideos) {
    await upsertVideoToDb(video);
  }

  console.log("[youtubeSync] 同期完了");
}

//1動画分を DB に upsert する
async function upsertVideoToDb(video: LiveVideo): Promise<void> {
  try {
    // 1. Channel を検索 or 作成
    let channel = await prisma.channel.findFirst({
      where: { name: video.channelTitle },
    });

    if (!channel) {
      console.log(`[youtubeSync] Channel作成: ${video.channelTitle}`);
      channel = await prisma.channel.create({
        data: {
          name: video.channelTitle,
          avatarUrl: video.channelIcon ?? null,
          bio: null,
        },
      });
    }

    // 2. Stream を upsert（externalId = videoId で一意）
    await prisma.stream.upsert({
      where: { externalId: video.videoId },
      update: {
        title: video.title,
        description: video.description ?? null,
        thumbnail: video.thumbnail,
        channelId: channel.id,
      },
      create: {
        title: video.title,
        description: video.description ?? null,
        thumbnail: video.thumbnail,
        source: "YOUTUBE",
        externalId: video.videoId,
        channelId: channel.id,
        userId: null,
      },
    });

    console.log(`[youtubeSync] upsert完了: ${video.title}`);
  } catch (err) {
    // 1動画の失敗で全体を止めない
    console.error(`[youtubeSync] upsertエラー(${video.videoId}):`, err);
  }
}