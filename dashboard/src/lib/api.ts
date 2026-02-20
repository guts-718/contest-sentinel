const BASE_URL = "http://localhost:3000";

async function request(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}

export const api = {
  getHealth: () => request("/health"),

  getSyncStatus: () => request("/sync-status"),

  getSettings: () => request("/settings"),

  updateSettings: (data: any) =>
    request("/settings", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  triggerSync: () =>
    request("/sync", {
      method: "POST",
    }),

  getUpcoming: () => request("/contests/upcoming"),

  getAllContests: () => request("/contests/all"),
};