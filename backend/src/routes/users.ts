import { Router } from "express";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

/**
 * GET /users/me
 */
router.get("/me", authMiddleware, async (req: any, res) => {
  const userId = req.user.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  res.json(user);
});

export default router;
