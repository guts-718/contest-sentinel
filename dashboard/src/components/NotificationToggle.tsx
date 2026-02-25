"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { requestPermission } from "@/src/lib/notify";

export default function NotificationToggle() {
  const [browserPerm, setBrowserPerm] =
    useState<NotificationPermission>("default");

  const [enabled, setEnabled] = useState(false);

  // Load browser permission + local toggle
  useEffect(() => {
    if ("Notification" in window) {
      setBrowserPerm(Notification.permission);
    }

    const saved = localStorage.getItem("notificationsEnabled");
    setEnabled(saved === "true");
  }, []);

  async function handleToggle() {
    // If not granted, request first
    if (browserPerm !== "granted") {
      const ok = await requestPermission();
      setBrowserPerm(ok ? "granted" : Notification.permission);
      if (!ok) return;
    }

    // Toggle app-level setting
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.setItem(
      "notificationsEnabled",
      String(newValue)
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`
        px-3 py-2 rounded-lg transition
        ${enabled
          ? "bg-green-600 hover:bg-green-500"
          : "bg-gray-600 hover:bg-gray-500"}
      `}
    >
      <Bell size={18} />
    </button>
  );
}