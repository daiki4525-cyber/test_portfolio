import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const payload = verifyToken(token) as { userId: number };

    req.user = {
      userId: payload.userId,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
