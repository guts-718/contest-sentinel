"use client";

import { useState } from "react";
import { api } from "@/src/lib/api";
import toast from "react-hot-toast";
import { RefreshCw } from "lucide-react";

export default function SyncButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleClick() {
  setLoading(true);

  try {
    await api.triggerSync();
    toast.success("Sync completed");
  } catch {
    toast.error("Sync failed");
  } finally {
    setLoading(false);
  }
}
//bg-indigo-600 hover:bg-indigo-700
  return (
<button 
  onClick={handleClick}
  disabled={loading}
  className={`
    icon-btn
    px-4 py-2
    rounded-lg
    transition
    active:scale-95
    ${loading ? "cursor-not-allowed " : "hover:bg-white/5"}
  `}
>

  <RefreshCw
    size={18}
    className={`
      transition-all
      ${loading
        ? "animate-spin text-green-500"
        : "text-black-300 group-hover:text-indigo-700"}
    `}
  />

</button>
  );
}