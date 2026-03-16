import { Router, Response } from "express";
import prisma from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middlewares/auth";
import { uploadAvatar } from "../middlewares/uploadAvatar";

const router = Router();

//GET /api/channels/me
//ログイン中ユーザーのChannelを取得
 
router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  try {
    const channel = await prisma.channel.findUnique({
      where: { userId },
    });

    if (!channel) {
      return res.status(404).json({ channel: null });
    }

    return res.json({ channel });
  } catch (err) {
    console.error("[GET /api/channels/me]", err);
    return res.status(500).json({ error: "取得に失敗しました" });
  }
});

//POST /api/channels/me
//Channelを新規作成する（1ユーザー1チャンネルまで）
router.post(
  "/me",
  authMiddleware,
  uploadAvatar.single("avatar"),
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { name, bio } = req.body as { name?: string; bio?: string };

    if (!name?.trim()) {
      return res.status(400).json({ error: "チャンネル名は必須です" });
    }

    try {
      // 既に登録済みか確認
      const existing = await prisma.channel.findUnique({ where: { userId } });
      if (existing) {
        return res.status(409).json({ error: "すでにチャンネルが登録されています" });
      }

      const avatarUrl = req.file
        ? `/uploads/avatars/${req.file.filename}`
        : null;

      const channel = await prisma.channel.create({
        data: {
          name: name.trim(),
          bio: bio?.trim() ?? null,
          avatarUrl,
          userId,
        },
      });

      return res.status(201).json({ channel });
    } catch (err) {
      console.error("[POST /api/channels/me]", err);
      return res.status(500).json({ error: "登録に失敗しました" });
    }
  }
);

//PUT /api/channels/me
//Channelを更新する
 
router.put(
  "/me",
  authMiddleware,
  uploadAvatar.single("avatar"),
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { name, bio } = req.body as { name?: string; bio?: string };

    if (!name?.trim()) {
      return res.status(400).json({ error: "チャンネル名は必須です" });
    }

    try {
      const existing = await prisma.channel.findUnique({ where: { userId } });
      if (!existing) {
        return res.status(404).json({ error: "チャンネルが見つかりません" });
      }

      const avatarUrl = req.file
        ? `/uploads/avatars/${req.file.filename}`
        : existing.avatarUrl; // 変更なければ既存を維持

      const channel = await prisma.channel.update({
        where: { userId },
        data: {
          name: name.trim(),
          bio: bio?.trim() ?? null,
          avatarUrl,
        },
      });

      return res.json({ channel });
    } catch (err) {
      console.error("[PUT /api/channels/me]", err);
      return res.status(500).json({ error: "更新に失敗しました" });
    }
  }
);

export default router;