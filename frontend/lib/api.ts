const API_BASE_URL = "http://localhost:3001";

export async function fetchStreams() {
  const res = await fetch(`${API_BASE_URL}/streams`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch streams");
  }

  return res.json();
}

export async function createStream(
  title: string,
  token: string
) {
  const res = await fetch("http://localhost:3001/streams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Failed to create stream");
  }

  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json(); // { token }
}

