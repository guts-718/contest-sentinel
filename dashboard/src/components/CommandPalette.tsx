"use client";

import { useMemo,useState } from "react";
import Fuse from "fuse.js";
import { Command } from "@/src/lib/commands";

export default function CommandPalette({
  open,
  setOpen,
  commands
}:{
  open:boolean;
  setOpen:(v:boolean)=>void;
  commands:Command[];
}){

  const [query,setQuery]=useState("");

  const results = useMemo(()=>{
    if(!query) return commands;
    const fuse = new Fuse(commands,{keys:["label"]});
    return fuse.search(query).map(r=>r.item);
  },[query,commands]);

  if(!open) return null;

  return(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32">

      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={()=>setOpen(false)}
      />

      {/* modal */}
      <div className="relative w-[600px] rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xl">

        <input
          autoFocus
          placeholder="Search commands..."
          value={query}
          onChange={e=>setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-transparent border-b border-[var(--border)] outline-none"
        />

        <div className="max-h-80 overflow-y-auto">

          {results.map(c=>(
            <button
              key={c.id}
              onClick={()=>{
                c.run();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-white/5 transition"
            >
              {c.label}
            </button>
          ))}

        </div>

      </div>
    </div>
  );
}