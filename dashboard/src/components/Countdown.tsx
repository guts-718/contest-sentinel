"use client";

import { useEffect, useState } from "react";

export default function Countdown({ time }: { time: string }) {
  const target = new Date(time).getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = target - now;

  if (diff <= 0) return <span className="text-green-400">Live</span>;

  const s = Math.floor(diff / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  return (
    <span className="font-mono text-indigo-400">
      {h}h {m}m {sec}s
    </span>
  );
}