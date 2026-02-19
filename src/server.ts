import express from "express";
import { config } from "./core/env";
import { log } from "./core/logger";
import { healthHandler } from "./modules/system/health.controller";
import { testFetchContests } from "./modules/contests/contest.debug";
import { manualSyncHandler } from "./modules/contests/contest.sync.controller";

export function startServer() {
  const app = express();

  app.use(express.json());

  // routes
  app.get("/health", healthHandler);

  app.get("/test-contests", testFetchContests);

  app.post("/sync", manualSyncHandler);

  app.listen(config.PORT, () => {
    log.api(`Server running on port ${config.PORT}`);
  });
}

// startServer();