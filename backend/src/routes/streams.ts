import { Router, Request, Response } from "express";
import { getActiveStreams } from "../services/streamService";
import { syncYouTubeStreams } from "../services/youtubeSync";

const router = Router();

//GET /api/streams
router.get("/", async (req: Request, res: Response) => {
  try {
    let streams = await getActiveStreams();

    if (req.query.source === "YOUTUBE" || req.query.source === "INTERNAL") {
      streams = streams.filter((s) => s.source === req.query.source);
    }
    if (req.query.isLive === "1" || req.query.isLive === "2") {
      const targetStatus = parseInt(req.query.isLive as string) as 1 | 2;
      streams = streams.filter((s) => s.isLive === targetStatus);
    }

    return res.json({ streams });
  } catch (err) {
    console.error("[GET /api/streams]", err);
    return res.status(500).json({ error: "配信一覧の取得に失敗しました" });
  }
});

//GET /api/streams/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const allStreams = await getActiveStreams();
    const stream = allStreams.find((s) => s.id === id);

    if (!stream) {
      return res.status(404).json({ error: "配信が見つかりません" });
    }

    return res.json(stream);
  } catch (err) {
    console.error(`[GET /api/streams/${id}]`, err);
    return res.status(500).json({ error: "配信情報の取得に失敗しました" });
  }
});

//POST /api/streams/sync/youtube
router.post("/sync/youtube", async (req: Request, res: Response) => {
  const { channelIds } = req.body as { channelIds?: string[] };

  if (!Array.isArray(channelIds) || channelIds.length === 0) {
    return res.status(400).json({ error: "channelIds（配列）が必要です" });
  }

  try {
    await syncYouTubeStreams(channelIds);
    return res.json({ message: "同期が完了しました", channelIds });
  } catch (err) {
    console.error("[POST /api/streams/sync/youtube]", err);
    return res.status(500).json({ error: "同期に失敗しました" });
  }
});

//POST /api/streams
 
router.post("/", async (req: Request, res: Response) => {
  const { title, source, categories, privacy, device } = req.body;

  if (!title) {
    return res.status(400).json({ error: "タイトルは必須です" });
  }

  try {
    // DB への保存処理（使用しているORMやDBに合わせて実装）
    return res.status(201).json({ message: "配信を作成しました" });
  } catch (err) {
    console.error("[POST /api/streams]", err);
    return res.status(500).json({ error: "配信の作成に失敗しました" });
  }
});

export default router;