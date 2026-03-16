import { getUserFromToken } from "@/lib/auth";

export async function authFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(init.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const res = await fetch(input, {
    ...init,
    headers,
  });

  // 🔥 401 = 強制ログアウト
  if (res.status === 401) {
    console.warn("[authFetch] 401 Unauthorized → logout");

    localStorage.removeItem("token");

    // useRouter が使えないので直リダイレクト
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return res;
}
