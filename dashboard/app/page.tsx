import StatusCard from "@/src/components/StatusCard";
import SyncButton from "@/src/components/SyncButton";
import UpcomingList from "@/src/components/UpcomingList";
import SettingsPanel from "@/src/components/SettingsPanel";
import ThemeToggle from "@/src/components/ThemeToggle";


export default function Home() {
  return (
    <main className="p-8 max-w-7xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Contest Agent Dashboard
        </h1>

        <div className="flex gap-3 items-center">
          <SyncButton />
          <ThemeToggle />
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-1">
          <StatusCard />
        </div>

        <div className="lg:col-span-2">
          <UpcomingList />
        </div>

        <div className="lg:col-span-3">
          <SettingsPanel />
        </div>

      </div>
    </main>
  );
}