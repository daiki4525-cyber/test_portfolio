import { Router } from "express";
import prisma from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middlewares/auth";

const router = Router();

//GET /channels/me
router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const channel = await prisma.channel.findUnique({
      where: { userId: req.user.id },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        bio: true,
      },
    });

    // channel が null（未登録）でも 200 で返す
    // フロント側で null かどうかで分岐する
    res.json({ channel: channel ?? null });
  } catch (err) {
    console.error("🔥 Fetch channel error", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;