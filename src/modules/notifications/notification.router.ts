import { getSettings } from "../settings/services/settings.service";
import { sendTelegramMessage } from "../reminders/services/telegram.sender";
import { log } from "../../core/logger";
import { sendEmail } from "./email.sender";

export async function sendNotification(message: string) {
  try {
    const settings = await getSettings();

    if (settings.telegramEnabled) {
      await sendTelegramMessage(message);
    }

    if (settings.emailEnabled && settings.emailAddress) {
        await sendEmail(
            settings.emailAddress,
            "Contest Reminder",
            message
        );
    }


  } catch (err: any) {
    log.error("[NOTIFY] failed: " + err.message);
  }
}
