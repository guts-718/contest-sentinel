export type Health = {
  status: string;
  uptimeSeconds: number;
  database: string;
  lastSync: string | null;
  lastSyncDurationMs: number | null;
  lastSyncSuccess: boolean | null;
  lastSyncProcessed: number;
  schedulerRunning: boolean;
  timestamp: string;
};

export type Settings = {
  telegramEnabled: boolean;
  emailEnabled: boolean;
  emailAddress: string;
  timezone: string;
};