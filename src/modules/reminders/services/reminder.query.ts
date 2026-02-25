import { ContestModel } from "../../contests/model/contest.model";

/**
 * Returns contests happening today (UTC day window)
 */
export async function getTodayContests() {
  const now = new Date();

  const startOfDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0
  ));

  const endOfDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    23, 59, 59
  ));

  return ContestModel.find({
    startTime: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  }).sort({ startTime: 1 });
}

/**
 * Returns contests starting within next 30 minutes
 */
export async function getUpcomingContests() {
  const now = new Date();
  const in30 = new Date(Date.now() + (6*60 * 60 * 1000)); // added 6 hours -- 5:30 for gmt -> ist

  return ContestModel.find({
    startTime: {
      $gte: now,
      $lte: in30,
    },
  }).sort({ startTime: 1 });
}
