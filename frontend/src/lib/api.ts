const API_BASE = "http://localhost:3001";

export async function apiFetch(path: string, options: RequestInit = {}) {
  console.log("[apiFetch]", API_BASE + path);

  return fetch(API_BASE + path, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}

export async function login(email: string, password: string) {
  const res = await apiFetch("/auth/login", { // ← ここ重要
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  console.log("[login] status:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("[login] error response:", text);
    throw new Error("Login failed");
  }

  const data = await res.json();
  return data.user;
}
