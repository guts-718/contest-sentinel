import express from "express";
import { config } from "./core/env";
import { log } from "./core/logger";
import { healthHandler } from "./modules/system/health.controller";

export function startServer() {
  const app = express();

  app.use(express.json());

  // routes
  app.get("/health", healthHandler);

  app.listen(config.PORT, () => {
    log.api(`Server running on port ${config.PORT}`);
  });
}

// startServer();