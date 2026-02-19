import { getSettings } from "../settings/services/settings.service";
import { sendTelegramMessage } from "../reminders/services/telegram.sender";
import { log } from "../../core/logger";

export async function sendNotification(message: string) {
  try {
    const settings = await getSettings();

    if (settings.telegramEnabled) {
      await sendTelegramMessage(message);
    }

    if (settings.emailEnabled) {
      // email sender to be added
      log.info("[NOTIFY] email enabled but sender not implemented yet");
    }

  } catch (err: any) {
    log.error("[NOTIFY] failed: " + err.message);
  }
}
