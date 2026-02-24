"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";

type Contest = {
  _id: string;
  title: string;
  startTime: string;
  url: string;
};

export default function ContestCalendar() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    api.getAllContests().then(setContests);
  }, []);

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  const contestMap: Record<string, Contest[]> = {};

  contests.forEach(c => {
    const d = new Date(c.startTime).toDateString();
    if (!contestMap[d]) contestMap[d] = [];
    contestMap[d].push(c);
  });

  const todayStr = new Date().toDateString();

  return (
    <div className="card space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          {date.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setDate(new Date(year, month - 1))}
            className="px-3 py-1 rounded bg-indigo-600 text-white"
          >
            ←
          </button>

          <button
            onClick={() => setDate(new Date())}
            className="px-3 py-1 rounded border border-[var(--border)]"
          >
            Today
          </button>

          <button
            onClick={() => setDate(new Date(year, month + 1))}
            className="px-3 py-1 rounded bg-indigo-600 text-white"
          >
            →
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-2 text-sm">

        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
          <div key={d} className="text-center text-gray-400">{d}</div>
        ))}

        {Array(firstDay).fill(null).map((_,i)=>
          <div key={i}/>
        )}

        {Array(days).fill(null).map((_,i)=>{
          const day = i+1;
          const d = new Date(year,month,day);
          const key = d.toDateString();
          const has = contestMap[key];

          return (
            <button
              key={day}
              onClick={()=>setSelected(key)}
              className={`h-16 rounded-lg border flex flex-col items-center justify-center relative
                ${key===todayStr ? "border-indigo-500" : "border-[var(--border)]"}
                hover:bg-white/5
              `}
            >
              {day}

              {has && (
                <span className="absolute bottom-1 w-1.5 h-1.5 bg-indigo-500 rounded-full"/>
              )}
            </button>
          );
        })}

      </div>

      {/* SELECTED DAY CONTESTS */}
      {selected && contestMap[selected] && (
        <div className="pt-4 border-t border-[var(--border)] space-y-2">

          <p className="text-sm text-gray-400">
            {selected}
          </p>

          {contestMap[selected].map(c=>(
            <a
              key={c._id}
              href={c.url}
              target="_blank"
              className="block p-2 rounded hover:bg-white/5"
            >
              {c.title}
            </a>
          ))}
        </div>
      )}

    </div>
  );
}