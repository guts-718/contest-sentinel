import { Request, Response } from "express";
import { isDBConnected } from "../../core/db";
import { getSyncStatus } from "../contests/sync/sync.status";
import { isSchedulerRunning } from "../../core/scheduler";

const startTime = Date.now();

export function healthHandler(_: Request, res: Response) {
  const sync = getSyncStatus();

  res.json({
    status: "ok",
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    database: isDBConnected() ? "connected" : "disconnected",

    lastSync: sync.lastRun,
    lastSyncDurationMs: sync.durationMs,
    lastSyncSuccess: sync.success,
    lastSyncProcessed: sync.processed,

    schedulerRunning: isSchedulerRunning(),

    timestamp: new Date().toISOString(),
  });
}
