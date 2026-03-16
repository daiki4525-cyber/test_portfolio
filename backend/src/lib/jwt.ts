import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// JWT に含めるペイロード型を定義
export interface TokenPayload {
  userId: number;
}

export function signToken(payload: TokenPayload): string {
  // jwt.sign の型にキャストして TypeScript エラー回避
  return jwt.sign(payload as jwt.JwtPayload, JWT_SECRET, {
    expiresIn: "1h",
  } as SignOptions);
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}
