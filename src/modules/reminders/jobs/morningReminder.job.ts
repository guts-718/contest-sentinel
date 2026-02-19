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
