import { ContestModel } from "../model/contest.model";
import { NormalizedContest } from "../types/contest.types";
import { log } from "../../../core/logger";

const BATCH_SIZE = 100;

export async function upsertContests(contests: NormalizedContest[]): Promise<void> {
  if (!contests.length) {
    log.info("[UPSERT] No contests to process");
    return;
  }

  let inserted = 0;
  let updated = 0;

  for (let i = 0; i < contests.length; i += BATCH_SIZE) {
    const batch = contests.slice(i, i + BATCH_SIZE);

    const operations = batch.map((c) => ({
      updateOne: {
        filter: { _id: `${c.platform}:${c.id}` },
        update: {
          $set: {
            _id: `${c.platform}:${c.id}`,
            platform: c.platform,
            title: c.title,
            startTime: c.startTime,
            endTime: c.endTime,
            durationMinutes: c.durationMinutes,
            url: c.url,
          },
        },
        upsert: true,
      },
    }));

    const result = await ContestModel.bulkWrite(operations);

    inserted += result.upsertedCount;
    updated += result.modifiedCount;
  }

  log.info(`[UPSERT] inserted=${inserted} updated=${updated} total=${contests.length}`);
}
