"use client";

import { useState } from "react";
import { api } from "@/src/lib/api";

export default function SyncButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setMsg(null);

    try {
      await api.triggerSync();
      setMsg("Sync completed successfully");
    } catch (err: any) {
      setMsg("Sync failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="hover:cursor-pointer px-4 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition"
      >
        {loading ? "Syncing..." : "Run Sync Now"}
      </button>
  );
}