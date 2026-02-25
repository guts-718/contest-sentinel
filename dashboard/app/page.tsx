"use client";

import StatusCard from "@/src/components/StatusCard";
import SyncButton from "@/src/components/SyncButton";
import UpcomingList from "@/src/components/UpcomingList";
import SettingsPanel from "@/src/components/SettingsPanel";
import ThemeToggle from "@/src/components/ThemeToggle";
import ContestTable from "@/src/components/ContestTable";
import ContestCalendar from "@/src/components/ContestCalendar";
import { useReminderListener } from "@/src/components/useReminderListener";
import NotificationToggle from "@/src/components/NotificationToggle";
import ReminderListener from "@/src/components/ReminderListener";
import StatusStrip from "@/src/components/StatusStrip";
import { useState } from "react";
import ViewTabs, { View } from "@/src/components/ViewTabs";
import ViewFrame from "@/src/components/ViewFrame";
import SettingsDrawer from "@/src/components/SettingsDrawer";

export default function Home() {
 // useReminderListener();
 const [view,setView] = useState<View>("upcoming");
  return (
    <main className="px-8 py-6 max-w-7xl mx-auto">

  <ReminderListener />

  {/* HEADER */}
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold tracking-tight">
      Contest Sentinel
    </h1>

    <div className="flex gap-3 items-center">
      <SyncButton />
      <NotificationToggle />
      <ThemeToggle />
      <SettingsDrawer>
      <SettingsPanel/>
    </SettingsDrawer>
    </div>
  </div>

  <StatusStrip />

  <ViewTabs view={view} setView={setView}/>

  <ViewFrame>

    {view==="upcoming" && <UpcomingList/>}
    {view==="calendar" && <ContestCalendar/>}
    {view==="table" && <ContestTable/>}

  </ViewFrame>

</main>

)};

