import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: number;
  user?: {
    id: number;
    name: string;
    email: string;
    bio?: string | null;
    avatarUrl?: string | null;
  };
}
