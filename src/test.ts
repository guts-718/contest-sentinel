// npx ts-node-dev src/test.ts

import { config } from "./core/env";
// import { log } from "./core/logger";
import { connectDB } from "./core/db";

connectDB();


// log.boot("system starting");
// log.db("connected");
// log.error("something failed");

import { registerJob, startScheduler } from "./core/scheduler";

registerJob({
  name: "testJob",
  schedule: "*/1 * * * *",
  task: async () => {
    console.log("job running...");
  },
});

startScheduler();


console.log(config);
