import StatusCard from "@/src/components/StatusCard";
import SyncButton from "@/src/components/SyncButton";
import UpcomingList from "@/src/components/UpcomingList";
import SettingsPanel from "@/src/components/SettingsPanel";
import ThemeToggle from "@/src/components/ThemeToggle";
import ContestTable from "@/src//components/ContestTable";

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
      <div className="grid gap-6">

  {/* ROW 1 */}
      <div className="grid lg:grid-cols-2 gap-6 items-stretch">

        <div className="h-[420px]">
          <StatusCard />
        </div>

        <div className="h-[420px]">
          <UpcomingList />
        </div>

      </div>

      {/* ROW 2 */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <SettingsPanel />
          <ContestTable />
        </div>
      </div>

    </div>
    </main>
  );
}
