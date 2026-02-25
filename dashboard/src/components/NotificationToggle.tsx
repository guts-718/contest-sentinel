"use client";

import { useState } from "react";
import { requestPermission } from "@/src/lib/notify";
import { Bell, RefreshCw, Sun, Moon } from "lucide-react";
export default function NotificationToggle() {
  const [enabled, setEnabled] = useState(false);

  async function enable() {
    const ok = await requestPermission();
    setEnabled(ok);
  }

  return (
    <button
      onClick={enable}
      className={`hover:cursor-pointer px-4 py-2 rounded-lg text-white ${
        enabled ? "bg-green-600" : "bg-gray-500"
      }`}
    >
      
       {enabled ? <Bell  size={18}/> : <Bell size={18}/>}
    </button>
  );
}