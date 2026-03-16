// jsonwebtoken ライブラリを読み込み
// jwt → 実際にトークンを作成・検証するための本体
// SignOptions → sign() に渡すオプションの型
import jwt, { SignOptions } from "jsonwebtoken";

/**
 * JWT_SECRET
 * 
 * ・JWTの署名に使う「秘密鍵」
 * ・process.env.JWT_SECRET があればそれを使用
 * ・なければ開発用として "your_secret" を使用
 */
export const JWT_SECRET = process.env.JWT_SECRET || "your_secret";

//signToken
export function signToken(payload: object) {
  // トークンのオプション設定
  // expiresIn: 有効期限（1時間）
  const options: SignOptions = { expiresIn: "1h" };

  // jwt.sign(ペイロード, 秘密鍵, オプション)
  // JWT_SECRET を string 型として明示キャスト
  return jwt.sign(payload, JWT_SECRET as string, options);
}

//verifyToken
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET as string);
}
