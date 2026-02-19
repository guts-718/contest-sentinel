import { registerJob } from "../../../core/scheduler";
import { runMorningReminders } from "../engine/reminder.engine";

export function registerMorningReminderJob() {
  registerJob({
    name: "morning-reminders",
    schedule: "*/2 * * * *",  // FOR TESTING RUNS EVERY 2 MINUTES
    task: async () => {
      await runMorningReminders();
    },
  });
}

//  schedule: "0 8 * * *",