import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { signToken, verifyToken } from "../lib/auth";

const router = Router();

//Cookie のオプションを一箇所で管理
//clearCookie 時も同じオプションを使わないと削除が効かない

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,   // 本番環境では true に変更
  sameSite: "lax" as const,
  path: "/",
};

// ログイン
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid email or password" });

  const token = signToken({ userId: user.id });

  res.cookie("token", token, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 1000, // 1時間（maxAge は clearCookie に不要なので分離）
  });

  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser });
});

// 登録
router.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(409).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, username, email, password: hashedPassword },
  });

  const { password: _, ...safeUser } = user;
  res.status(201).json(safeUser);
});

// ログアウト
router.post("/logout", (req, res) => {
  console.log("cookies:", req.cookies);
  console.log("headers:", req.headers.cookie);
  res.clearCookie("token", COOKIE_OPTIONS);
  res.json({ message: "Logged out" });
});

// ログイン中ユーザー取得
router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ user: null });

  try {
    const payload: any = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return res.status(401).json({ user: null });

    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch {
    res.status(401).json({ user: null });
  }
});

export default router;