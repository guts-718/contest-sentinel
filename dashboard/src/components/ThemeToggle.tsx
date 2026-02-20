"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function handleToggle() {
    const newDark = !dark;
    setDark(newDark);

    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

return (
  <button
    onClick={handleToggle}
    className="
      px-4 py-2 rounded-xl border text-sm font-medium cursor-pointer
      bg-white text-black border-gray-300
      hover:bg-gray-100
      dark:bg-slate-900 dark:text-white dark:border-slate-700
      dark:hover:bg-slate-800
      transition-colors
    "
  >
    {dark ? "🌙 Dark" : "☀ Light"}
  </button>
);
}