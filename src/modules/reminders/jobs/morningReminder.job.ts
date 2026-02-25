import { registerJob } from "../../../core/scheduler";
import { runMorningReminders } from "../engine/reminder.engine";

export function registerMorningReminderJob() {
  registerJob({
    name: "morning-reminders",
    schedule: "0 8 * * *",
    task: async () => {
      await runMorningReminders();
    },
  });
}

//  schedule: "0 8 * * *",
// "*/2 * * * *",  // FOR TESTING RUNS EVERY 2 MINUTES