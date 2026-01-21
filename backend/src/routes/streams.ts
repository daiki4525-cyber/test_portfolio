import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware, AuthRequest } from "../middlewares/auth";

const router = Router();
const prisma = new PrismaClient();

router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const stream = await prisma.stream.create({
    data: {
      title,
      userId: req.userId!,
    },
  });

  res.json(stream);
});

// 🔓 配信一覧（ログイン不要）
router.get("/", async (req, res) => {
  const streams = await prisma.stream.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.json(streams);
});

/**
 * 🔓 配信詳細（ログイン不要）
 */
router.get("/:id", async (req, res) => {
  const streamId = Number(req.params.id);

  // idが数字じゃない場合
  if (isNaN(streamId)) {
    return res.status(400).json({ message: "Invalid stream id" });
  }

  const stream = await prisma.stream.findUnique({
    where: { id: streamId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  // 見つからない場合
  if (!stream) {
    return res.status(404).json({ message: "Stream not found" });
  }

  res.json(stream);
});


export default router;
