import { Request, Response } from "express";
import { runContestSync } from "./sync/contest.sync";
import { log } from "../../core/logger";

export async function manualSyncHandler(_: Request, res: Response) {
  try {
    log.info("[MANUAL] Sync triggered");

    await runContestSync();

    res.json({
      status: "success",
      message: "Contest sync completed",
    });

  } catch (err: any) {
    log.error("[MANUAL] Sync failed: " + err.message);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}
