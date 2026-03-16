import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  userId: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
};

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
}
