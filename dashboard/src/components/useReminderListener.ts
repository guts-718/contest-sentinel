"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/src/lib/api";
import { sendNotification } from "@/src/lib/notify";

export function useReminderListener() {

  const seen = useRef(new Set<string>());
  const [enabled,setEnabled] = useState(false);

  // read localStorage safely (client only)
  useEffect(()=>{
    const val = localStorage.getItem("notificationsEnabled");
    setEnabled(val==="true");
  },[]);

  useEffect(()=>{

    if(!enabled) return;

    const check = async () => {
      const contests = await api.getUpcoming();

      contests.forEach((c:any)=>{
        if(!seen.current.has(c._id)){
          seen.current.add(c._id);

          sendNotification(
            "Upcoming Contest",
            `${c.title} starting soon`
          );
        }
      });
    };

    check();
    const id = setInterval(check,60000);

    return()=>clearInterval(id);

  },[enabled]);
}