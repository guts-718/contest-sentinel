import { ContestModel } from "../model/contest.model";
import { log } from "../../../core/logger";

const RETENTION_DAYS = 32;

export async function cleanupOldContests(): Promise<void> {
  try {
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);

    const result = await ContestModel.deleteMany({
      startTime: { $lt: cutoff },
    });

    if (result.deletedCount && result.deletedCount > 0) {
      log.info(`[CLEANUP] removed ${result.deletedCount} old contests`);
    } else {
      log.info("[CLEANUP] no old contests to delete");
    }
  } catch (err: any) {
    log.error("[CLEANUP] failed: " + err.message);
  }
}
