"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/src/lib/api";

type Contest = {
  _id: string;
  title: string;
  platform: string;
  startTime: string;
  url: string;
};

export default function ContestTable() {
  const [data, setData] = useState<Contest[]>([]);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    api.getAllContests().then(setData);
  }, []);

  const filtered = useMemo(() => {
    let list = [...data];

    if (search)
      list = list.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );

    if (platform !== "all")
      list = list.filter(c => c.platform === platform);

    list.sort((a, b) =>
      sortAsc
        ? new Date(a.startTime).getTime() -
          new Date(b.startTime).getTime()
        : new Date(b.startTime).getTime() -
          new Date(a.startTime).getTime()
    );

    return list;
  }, [data, search, platform, sortAsc]);

  const platforms = [...new Set(data.map(c => c.platform))];

  return (
    <div className="card space-y-4">

      {/* HEADER */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <h2 className="text-lg font-semibold">All Contests</h2>

        <div className="flex gap-2 flex-wrap">

          <input
            placeholder="Search contest..."
            className="px-3 py-1.5 rounded border border-[var(--border)] bg-transparent"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="px-2 py-1.5 rounded border border-[var(--border)] bg-transparent"
            value={platform}
            onChange={e => setPlatform(e.target.value)}
          >
            <option value="all">All</option>
            {platforms.map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="px-3 py-1.5 rounded bg-indigo-600 text-white text-sm"
          >
            {sortAsc ? "↑ Soonest" : "↓ Latest"}
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-auto max-h-[420px]">

        <table className="w-full text-sm">

          <thead className="sticky top-0 bg-[var(--card)]">
            <tr className="text-left border-b border-[var(--border)]">
              <th className="py-2">Contest</th>
              <th>Platform</th>
              <th>Start Time</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(c => (
              <tr
                key={c._id}
                className="border-b border-[var(--border)] hover:bg-white/5 transition"
              >
                <td className="py-2">
                  <a
                    href={c.url}
                    target="_blank"
                    className="text-indigo-500 hover:underline"
                  >
                    {c.title}
                  </a>
                </td>

                <td className="capitalize">{c.platform}</td>

                <td>
                  {new Date(c.startTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}