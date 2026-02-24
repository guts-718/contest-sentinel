"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import PlatformBadge from "./PlatformBadge";

type Contest = {
  _id: string;
  title: string;
  platform: string;
  startTime: string;
  url: string;
};

export default function UpcomingList() {
  const [data, setData] = useState<Contest[]>([]);

  useEffect(() => {
    api.getUpcoming().then(setData);
  }, []);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h2 className="text-xl font-semibold tracking-tight mb-4">
        Upcoming Contests
      </h2>

      {/* LIST */}
      <div className="space-y-3">

        {data.map(c => (
          <a
  key={c._id}
  href={c.url}
  target="_blank"
  className="
    group
    block
    rounded-xl
    border border-[var(--border)]
    px-5 py-4
    bg-[var(--card)]
    transition
    hover:border-indigo-500/60
    hover:shadow-md
  "
>
  <div className="flex items-center justify-between">

    {/* LEFT */}
    <div className="space-y-1 max-w-[70%]">

      <div className="
        font-medium
        text-[15px]
        truncate
        group-hover:text-indigo-400
        transition
      ">
        {c.title}
      </div>

      <div className="text-sm text-gray-400">
        {new Date(c.startTime).toLocaleString()}
      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-4">

      <PlatformBadge name={c.platform}/>

      <span className="
        text-gray-500
        group-hover:text-indigo-400
        transition
        text-lg
      ">
        →
      </span>

    </div>

  </div>
</a>
        ))}

      </div>
    </div>
  );
}