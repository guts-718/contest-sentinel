import nodemailer from "nodemailer";
import { config } from "../../core/env";
import { log } from "../../core/logger";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    await transporter.sendMail({
      from: `"Contest Agent" <${config.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    log.info("[EMAIL] message sent");
  } catch (err: any) {
    log.error("[EMAIL] send failed: " + err.message);
  }
}
