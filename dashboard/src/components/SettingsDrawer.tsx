"use client";

import { useState } from "react";
import {Settings} from "lucide-react";

export default function SettingsDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open,setOpen]=useState(false);

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={()=>setOpen(true)}
        className="icon-btn"
      >
        <Settings size={18}/>
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={()=>setOpen(false)}
        />
      )}

      {/* DRAWER */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[340px]
          bg-[var(--card)]
          border-l border-[var(--border)]
          shadow-xl z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 space-y-6">

          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Settings</h2>
            <button onClick={()=>setOpen(false)}>✕</button>
          </div>

          {children}

        </div>
      </div>
    </>
  );
}