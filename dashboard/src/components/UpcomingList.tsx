"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";

type Contest = {
  _id: string;
  title: string;
  startTime: string;
  url: string;
  platform: string;
};

export default function UpcomingList() {
  const [data, setData] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await api.getUpcoming();
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60000);
    return () => clearInterval(id);
  }, []);

  if (loading)
    return (
      <div className=" card shadow">
        Loading contests...
      </div>
    );

  return (
    <div className="card h-full flex flex-col">
      <h2 className="text-lg font-semibold tracking-wide">Upcoming Contests</h2>

      {data.length === 0 && (
        <p className="text-gray-500 text-sm">No contests soon</p>
      )}

      <div className="overflow-y-auto pr-2 space-y-3">
  {data.map(c => (
        <div
          key={c._id}
          className="border rounded-lg p-3 hover:bg-gray-50 transition"
        >
          <a
            href={c.url}
            target="_blank"
            className="font-medium text-blue-600"
          >
            {c.title}
          </a>

          <div className="text-sm text-gray-500">
            {new Date(c.startTime).toLocaleString()}
          </div>

          <div className="text-xs text-gray-400">
            {c.platform}
          </div>
        </div>

      ))}
      </div>
    </div>
  );
}