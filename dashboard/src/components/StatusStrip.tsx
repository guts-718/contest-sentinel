"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";

export default function StatusStrip() {
  const [d, setD] = useState<any>(null);

  useEffect(() => {
    api.getHealth().then(setD);
  }, []);

  if (!d) return null;

  return (
    <div className="w-full bg-[var(--card)] border-y border-[var(--border)] px-6 py-2 text-sm flex flex-wrap gap-6 justify-center">

      <Item label="Status" val={d.status}/>
      <Item label="DB" val={d.database}/>
      <Item label="Scheduler" val={d.schedulerRunning ? "Running":"Stopped"}/>
      <Item label="Processed" val={d.lastSyncProcessed}/>
      <Item label="Uptime" val={`${d.uptimeSeconds}s`}/>

    </div>
  );
}

function Item({label,val}:any){
  return (
    <span className="text-gray-400">
      {label}: <span className="text-[var(--text)] font-medium">{val}</span>
    </span>
  );
}