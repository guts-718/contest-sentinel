import { ProviderContest, NormalizedContest, Platform } from "./types/contest.types";
import { log } from "../../core/logger";

function toDate(value: string | number | Date): Date {
  const d = new Date(value);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  return d;
}

function detectPlatform(url: string): Platform | null {
  const u = url.toLowerCase();

  if (u.includes("codeforces")) return Platform.CODEFORCES;
  if (u.includes("codechef")) return Platform.CODECHEF;
  if (u.includes("leetcode")) return Platform.LEETCODE;
  if (u.includes("atcoder")) return Platform.ATCODER;

  return null;
}

export function normalizeContests(raw: ProviderContest[]): NormalizedContest[] {
  const normalized: NormalizedContest[] = [];

  for (const c of raw) {
    try {
      const platform = detectPlatform(c.url);
      if (!platform) continue;

      const start = toDate(c.start);
      const end = toDate(c.end);

      if (end <= start) continue;

      const durationMinutes = Math.floor(
        (end.getTime() - start.getTime()) / 60000
      );

      normalized.push({
        id: c.id,
        platform,
        title: c.title.trim(),
        startTime: start,
        endTime: end,
        durationMinutes,
        url: c.url,
      });

    } catch (err: any) {
      log.error("[NORMALIZE] Failed contest: " + err.message);
    }
  }

  log.info(`[NORMALIZE] ${normalized.length} contests normalized`);

  return normalized;
}
