import { registerJob } from "../../../core/scheduler";
import { runUpcomingReminders } from "../engine/reminder.engine";

export function registerUpcomingReminderJob() {
  registerJob({
    name: "upcoming-reminders",
    schedule: "* * * * *",
    task: async () => {
      await runUpcomingReminders();
    },
  });
}
