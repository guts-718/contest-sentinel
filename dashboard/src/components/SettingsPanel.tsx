"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import { Settings } from "@/src/types";

export default function SettingsPanel() {
  const [data, setData] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    const res = await api.getSettings();
    setData(res);
  }

  async function save() {
    if (!data) return;

    setSaving(true);
    setMsg(null);

    try {
      await api.updateSettings(data);
      setMsg("Saved successfully");
    } catch {
      setMsg("Save failed");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (!data)
    return (
      <div className="card shadow">
        Loading settings...
      </div>
    );

  return (
    <div className="card space-y-5">
      <h2 className="text-lg font-semibold tracking-wide">Settings</h2>
      <div className="space-y-4">
      <Toggle
        label="Telegram Notifications"
        checked={data.telegramEnabled}
        onChange={v => setData({ ...data, telegramEnabled: v })}
      />

      <Toggle
        label="Email Notifications"
        checked={data.emailEnabled}
        onChange={v => setData({ ...data, emailEnabled: v })}
      />
      </div>
      <div className="space-y-4 pt-2 border-t border-[var(--border)]">
      <Input
        label="Email Address"
        value={data.emailAddress}
        onChange={v => setData({ ...data, emailAddress: v })}
      />

      <Input
        label="Timezone"
        value={data.timezone}
        onChange={v => setData({ ...data, timezone: v })}
      />
      </div>

      <button
        onClick={save}
        disabled={saving}
        className={` hover:cursor-pointer px-5 py-2 rounded-xl text-white ${
          saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>

      {msg && <p className="text-sm text-gray-600">{msg}</p>}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        className="border rounded p-2"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}