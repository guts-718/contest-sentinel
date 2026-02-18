import { connectDB } from "./db";
import { startServer } from "../server";
import { startScheduler } from "./scheduler";
import { log } from "./logger";

export async function startSystem() {
  try {
    log.boot("Starting system...");

    await connectDB();

    startServer();

    startScheduler();

    log.boot("System started successfully");
  } catch (err: any) {
    log.error("Fatal startup error: " + err.message);
    process.exit(1);
  }
}
