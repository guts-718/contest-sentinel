import { config } from "../../../core/env";
import { log } from "../../../core/logger";

const TELEGRAM_API = `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`;

console.log("bot token: ", config.TELEGRAM_BOT_TOKEN);
console.log("telegram chat id: ", config.TELEGRAM_CHAT_ID);
export async function sendTelegramMessage(text: string): Promise<void> {
  try {
    const res = await fetch(TELEGRAM_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: config.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      console.log("res: ",res);
      const errText = await res.text();
      throw new Error(`Telegram API error: ${errText}`);
    }

    log.info("[TELEGRAM] message sent");
  } catch (err: any) {
    log.error("[TELEGRAM] send failed: " + err.message);
  }
}
