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
    <div className="p-6 bg-white rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Manual Sync</h2>

      <button
        onClick={handleClick}
        disabled={loading}
        className={`px-5 py-2 rounded-xl font-medium text-white ${
          loading
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Syncing..." : "Run Sync Now"}
      </button>

      {msg && (
        <p className="text-sm text-gray-600">
          {msg}
        </p>
      )}
    </div>
  );
}