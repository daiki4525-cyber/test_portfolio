/*"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
};

export function useAuth(redirectTo?: string) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/auth/me", {
      credentials: "include",
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
        if (redirectTo) {
          router.replace(redirectTo);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [redirectTo, router]);

  /**
   * logout 関数
   * 1. POST /auth/logout でバックエンドの Cookie を削除
   * 2. フロントの user 状態を null にリセット
   * 3. 指定パスにリダイレクト（デフォルト: "/"）
   */
  /*
  const logout = async (redirectAfter: string = "/") => {
    try {
      await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("[useAuth] logout error:", err);
    } finally {
      // バックエンドの結果に関わらず確実にリセット
      setUser(null);
      router.replace(redirectAfter);
    }
  };

  return { user, loading, logout };
}*/