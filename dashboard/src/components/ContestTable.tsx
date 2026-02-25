"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/src/lib/api";
import { formatTime } from "@/src/lib/time";
import PlatformBadge from "./PlatformBadge";
import Countdown from "./Countdown";
import { Settings } from "@/src/types";


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
  const [settings, setSettings]=useState<Settings | null>(null);


  async function load() {
    const res = await api.getSettings();
    setSettings(res);
    console.log("this is the loaded settings: ",settings);
  }
  useEffect(() => {
    api.getAllContests().then(setData);
     load();
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
  console.log("settings: ",settings);
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

          <div className="grid grid-cols-[2.5fr_1fr_1.5fr_1fr] text-sm font-medium border-b border-[var(--border)] pb-2">
          <div>Contest</div>
          <div>Platform</div>
          <div>Start Time</div>
          <div>Starts In</div>
        </div>

    <div className="mt-2 space-y-1">

      {filtered.map(c=>(
        <div
          key={c._id}
          className="
            grid grid-cols-[2.5fr_1fr_1.5fr_1fr]
            items-center
            px-2 py-2
            rounded-lg
            hover:bg-white/5
            transition
          "
        >

        {/* TITLE */}
        <a
          href={c.url}
          target="_blank"
          className="truncate text-indigo-400 hover:underline"
          title={c.title}
        >
          {c.title}
        </a>

        {/* PLATFORM */}
        <div>
        <PlatformBadge name={c.platform}/>
        </div>

        {/* TIME */}
        <div className="text-gray-400 text-sm">
          { formatTime(c.startTime, settings?.timezone)}
        </div>

        {/* COUNTDOWN */}
        {/* <Countdown time= { formatTime(c.startTime, settings?.timezone)}/> */}
         <Countdown time= { c.startTime }/> {/*this needs some fixing */}

      </div>
    ))}

</div>

     
      </div>
    </div>
  );
}