import { registerJob } from "../core/scheduler";
import { runContestSync } from "../modules/contests/sync/contest.sync";

export function registerContestSyncJob() {
  registerJob({
    name: "contest-sync",
    schedule: "* * * * *", // for the purpose of testing
   
    task: async () => {
      await runContestSync();
    },
  });
}

//  schedule: "0 */6 * * *", - this is desired