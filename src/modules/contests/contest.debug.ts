import { Request, Response } from "express";
import { ClistProvider } from "./providers/clist.provider";
import { normalizeContests } from "./contest.normalizer";
import { log } from "../../core/logger";

export async function testFetchContests(_: Request, res: Response) {
  try {
    const provider = new ClistProvider();

    log.info("[TEST] Fetching contests from provider");

    const raw = await provider.fetchContests();

    const normalized = normalizeContests(raw);

    res.json({
      rawCount: raw.length,
      normalizedCount: normalized.length,
      sample: normalized.slice(0, 5),
    });
  } catch (err: any) {
    log.error("[TEST] Failed: " + err.message);
    res.status(500).json({ error: err.message });
  }
}
