import { getUpcomingContests, getTodayContests } from "../services/reminder.query";
import { alreadySent, markSent } from "../services/reminder.dedupe";
// import { sendTelegramMessage } from "../services/telegram.sender";
import { NotificationType } from "../models/notification.model";
import { log } from "../../../core/logger";
import { sendNotification } from "../../notifications/notification.router";


function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Sends morning digest
 */
export async function runMorningReminders() {
  try {
    const contests = await getTodayContests();

    if (!contests.length) {
           const msg =
          `🌅 *Good Morning*

          No contests today.

          Use this day to practice problems, revise concepts, or upsolve past contests.

          Consistency beats intensity.`;

                await sendNotification(msg);
                log.info("[REMINDER] sent no-contest morning message");
                return;
    }

    let message = `📅 *Contests Today*\n\n`;

    for (const c of contests) {
      const sent = await alreadySent(c._id, NotificationType.MORNING);
      if (sent) continue;

      message += `• *${c.title}*\n`;
      message += `  ${formatTime(c.startTime)}\n`;
      message += `  ${c.url}\n\n`;

      await markSent(c._id, NotificationType.MORNING);
    }

    if (message.trim() === "📅 *Contests Today*") return;

    await sendNotification(message);
  } catch (err: any) {
    log.error("[REMINDER] morning failed: " + err.message);
  }
}

/**
 * Sends 30-minute reminders
 */
export async function runUpcomingReminders() {
  try {
    const contests = await getUpcomingContests();

    for (const c of contests) {
      const sent = await alreadySent(c._id, NotificationType.BEFORE_30_MIN);
      if (sent) continue;

      const msg =
`⏰ *Contest Starting Soon*

*${c.title}*
Starts at: ${formatTime(c.startTime)}

${c.url}`;

      await sendNotification(msg);
      await markSent(c._id, NotificationType.BEFORE_30_MIN);
    }

    if (!contests.length) {
      log.info("[REMINDER] no upcoming contests");
    }

  } catch (err: any) {
    log.error("[REMINDER] upcoming failed: " + err.message);
  }
}
