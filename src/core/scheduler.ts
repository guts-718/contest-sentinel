import cron, { ScheduledTask } from "node-cron";
import { log } from "./logger";

let schedulerRunning = false;

type Job = {
  name: string;
  schedule: string;
  task: () => Promise<void> | void;
};
// const jobs = new Map<string, cron.ScheduledTask>(); - this failed

const jobs = new Map<string, ScheduledTask>();

export function registerJob(job: Job) {
  if (jobs.has(job.name)) {
    log.error(`Job already registered: ${job.name}`);
    return;
  }

  log.cron(`Registering job → ${job.name} (${job.schedule})`);

  const scheduled = cron.schedule(job.schedule, async () => {
    log.cron(`Running job → ${job.name}`);
    try {
      await job.task();
      log.cron(`Completed job → ${job.name}`);
    } catch (err: any) {
      log.error(`Job failed → ${job.name}: ${err.message}`);
    }
  });

  jobs.set(job.name, scheduled);
}

export function startScheduler() {
  schedulerRunning = true;
  log.cron("Scheduler started");
}


export function stopScheduler() {
  log.cron("Stopping scheduler...");
  jobs.forEach((job) => job.stop());
}


export function isSchedulerRunning() {
  return schedulerRunning;
}
