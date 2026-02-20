import express from "express";
import { config } from "./core/env";
import { log } from "./core/logger";
import { healthHandler } from "./modules/system/health.controller";
import { testFetchContests } from "./modules/contests/contest.debug";
import { manualSyncHandler } from "./modules/contests/contest.sync.controller";
import { syncStatusHandler } from "./modules/contests/sync/sync.status.controller";
import {
  getSettingsHandler,
  updateSettingsHandler,
} from "./modules/settings/settings.controller";

export function startServer() {
  const app = express();

  app.use(express.json());

  // routes

  app.get("/sync-status", syncStatusHandler);

  app.get("/health", healthHandler);

  app.get("/test-contests", testFetchContests);

  app.post("/sync", manualSyncHandler);

  app.get("/settings", getSettingsHandler);
  app.patch("/settings", updateSettingsHandler);

  app.listen(config.PORT, () => {
    log.api(`Server running on port ${config.PORT}`);
  });
}

// startServer();