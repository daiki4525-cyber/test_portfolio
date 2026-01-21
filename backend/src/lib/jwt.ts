import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: object): string {
  return jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: "7d" } as jwt.SignOptions
  );
}
