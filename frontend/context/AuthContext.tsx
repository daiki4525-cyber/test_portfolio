"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type User = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: (redirectAfter?: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * 初回マウント時：/auth/me で認証状態を確認
   * httpOnly Cookie は JS から読めないため localStorage は使わない
   */
  useEffect(() => {
    fetch("http://localhost:3001/auth/me", {
      credentials: "include", // httpOnly Cookie を自動送信
    })
      .then((res) => {
        if (!res.ok) throw new Error("unauthorized");
        return res.json();
      })
      .then((data) => {
        const u = data.user ?? data;
        setUser({
          id: u.id,
          name: u.name,
          email: u.email,
          bio: u.bio ?? null,
          avatarUrl: u.avatarUrl ?? null,
        });
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /**
   * ログイン成功後に呼ぶ
   * バックエンドがすでに Cookie をセット済みなので、user 状態を更新するだけでよい
   */
  const login = (user: User) => {
    setUser(user);
  };

  /**
   * ログアウト
   * 1. POST /auth/logout でバックエンドの Cookie を削除
   * 2. user 状態を null にリセット
   * 3. 指定パスにリダイレクト（デフォルト: "/"）
   */
  const logout = async (redirectAfter: string = "/") => {
    try {
      await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("[AuthContext] logout error:", err);
    } finally {
      setUser(null);
      router.replace(redirectAfter);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}