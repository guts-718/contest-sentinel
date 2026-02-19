type SyncStatus = {
  lastRun: Date | null;
  durationMs: number | null;
  success: boolean | null;
  processed: number;
};

const status: SyncStatus = {
  lastRun: null,
  durationMs: null,
  success: null,
  processed: 0,
};

export function updateSyncStatus(update: Partial<SyncStatus>) {
  Object.assign(status, update);
}

export function getSyncStatus(): SyncStatus {
  return status;
}

// this is intentionally in memory as status is runtime info and not persistent data