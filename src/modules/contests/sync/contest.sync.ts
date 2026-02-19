import { ClistProvider } from "../providers/clist.provider";
import { normalizeContests } from "../contest.normalizer";
import { upsertContests } from "../services/contest.upsert";
import { cleanupOldContests } from "../services/contest.cleanup";
import { log } from "../../../core/logger";

const WINDOW_DAYS = 30;

function withinWindow(date: Date): boolean {
  const now = Date.now();

  const pastLimit = now - WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const futureLimit = now + WINDOW_DAYS * 24 * 60 * 60 * 1000;

  const t = date.getTime();
  return t >= pastLimit && t <= futureLimit;
}

export async function runContestSync(): Promise<void> {
  try {
    log.info("[SYNC] Starting contest sync");

    const provider = new ClistProvider();

    // fetch
    const raw = await provider.fetchContests();

    log.info(`[SYNC] fetched ${raw.length} contests`);

    // normalize
    const normalized = normalizeContests(raw);

    // filter window
    const filtered = normalized.filter(c => withinWindow(c.startTime));

    log.info(`[SYNC] ${filtered.length} contests within window`);

    // upsert
    await upsertContests(filtered);

    // cleanup
    await cleanupOldContests();

    log.info("[SYNC] Contest sync completed");
  } catch (err: any) {
    log.error("[SYNC] failed: " + err.message);
  }
}
