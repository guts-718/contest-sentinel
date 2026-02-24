"use client";

import { useEffect, useRef } from "react";
import { api } from "@/src/lib/api";
import { sendNotification } from "@/src/lib/notify";

export function useReminderListener() {
  const seen = useRef(new Set<string>());

  useEffect(() => {
    const check = async () => {
      const contests = await api.getUpcoming();

      contests.forEach((c: any) => {
        const id = c._id;

        if (!seen.current.has(id)) {
          seen.current.add(id);

          sendNotification(
            "Upcoming Contest",
            `${c.title} starting soon`
          );
        }
      });
    };

    check();
    const id = setInterval(check, 60000);

    return () => clearInterval(id);
  }, []);
}