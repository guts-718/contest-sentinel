"use client";

export type View = "upcoming" | "calendar" | "table";

export default function ViewTabs({
  view,
  setView,
}: {
  view: View;
  setView: (v: View) => void;
}) {
  const tabs: View[] = ["upcoming", "calendar", "table"];

  return (
    <div className="flex gap-2 justify-center mt-4">

      {tabs.map(t => (
        <button
          key={t}
          onClick={() => setView(t)}
          className={`px-4 py-1.5 rounded-lg text-sm capitalize transition
            ${
              view === t
                ? "bg-indigo-600 text-white"
                : "bg-[var(--card)] border border-[var(--border)] hover:bg-white/10"
            }
          `}
        >
          {t}
        </button>
      ))}

    </div>
  );
}