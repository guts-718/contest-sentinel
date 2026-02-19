import { connectDB } from "./db";
import { startServer } from "../server";
import { startScheduler } from "./scheduler";
import { log } from "./logger";
import { registerContestSyncJob } from "../jobs/contestSync.job";
import { registerUpcomingReminderJob } from "../modules/reminders/jobs/upcomingReminder.job";
import { registerMorningReminderJob } from "../modules/reminders/jobs/morningReminder.job";

export async function startSystem() {
  try {
    log.boot("Starting system...");

    await connectDB();

    startServer();

    registerContestSyncJob();
    registerUpcomingReminderJob();
    registerMorningReminderJob();

    
    startScheduler();


    log.boot("System started successfully");
  } catch (err: any) {
    log.error("Fatal startup error: " + err.message);
    process.exit(1);
  }
}
