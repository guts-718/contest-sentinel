"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import { Health } from "@/src/types";

export default function StatusCard() {
  const [data, setData] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await api.getHealth();
      setData(res);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Backend not reachable
      </div>
    );

  if (!data)
    return (
      <div className="p-4 bg-gray-100 rounded animate-pulse">
        Loading status...
      </div>
    );

  return (
    <div className="card shadow space-y-3">
      <h2 className="text-xl font-semibold">System Status</h2>

      <Row label="Status" value={data.status} />
      <Row label="Database" value={data.database} />
      <Row label="Scheduler" value={data.schedulerRunning ? "Running" : "Stopped"} />
      <Row label="Last Sync" value={data.lastSync ?? "Never"} />
      <Row label="Processed" value={String(data.lastSyncProcessed)} />
      <Row label="Duration" value={data.lastSyncDurationMs ? `${data.lastSyncDurationMs} ms` : "-"} />
      <Row label="Uptime" value={`${data.uptimeSeconds}s`} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}