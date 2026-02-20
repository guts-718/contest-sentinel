import StatusCard from "@/src/components/StatusCard";
import SyncButton from "@/src/components/SyncButton";

export default function Home() {
  return (
    <main className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">Contest Agent Dashboard</h1>

      <StatusCard />
      <SyncButton />
    </main>
  );
}