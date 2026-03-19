import prisma from "../lib/prisma";
import { getLiveFromChannel, LiveVideo } from "../lib/youtube";

export async function syncYouTubeStreams(channelIds: string[]): Promise<void> {
  if (channelIds.length === 0) return;

  console.log(`[youtubeSync] 同期開始: ${channelIds.length}チャンネル`);

  // ✅ 並列でAPIを叩く（直列→並列に変更）
  const results = await Promise.allSettled(
    channelIds.map((id) => getLiveFromChannel(id))
  );

  const allVideos: LiveVideo[] = [];
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      allVideos.push(...result.value);
    } else {
      // 1チャンネル失敗しても他は継続
      console.error(`[youtubeSync] チャンネル取得失敗(${channelIds[i]}):`, result.reason);
    }
  });

  // 終了済みをスキップ（配信中=1 と 配信予定=2 のみ処理）
  const activeVideos = allVideos.filter((v) => v.isLive !== 0);

  console.log(
    `[youtubeSync] 対象動画: ${activeVideos.length}件（全${allVideos.length}件中）`
  );

  // DB upsertも並列化
  await Promise.allSettled(activeVideos.map((video) => upsertVideoToDb(video)));

  console.log("[youtubeSync] 同期完了");
}

async function upsertVideoToDb(video: LiveVideo): Promise<void> {
  try {
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
    console.error(`[youtubeSync] upsertエラー(${video.videoId}):`, err);
  }
}