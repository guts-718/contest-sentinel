import dotenv from "dotenv";

dotenv.config();

type Config = {
  PORT: number;
  MONGO_URI: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  EMAIL_API_KEY: string;
  CONTEST_API_KEY: string;
  TIMEZONE: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`[ENV ERROR] Missing environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

export const config: Config = {
  PORT: Number(requireEnv("PORT")),
  MONGO_URI: requireEnv("MONGO_URI"),
  TELEGRAM_BOT_TOKEN: requireEnv("TELEGRAM_BOT_TOKEN"),
  TELEGRAM_CHAT_ID: requireEnv("TELEGRAM_CHAT_ID"),
  EMAIL_API_KEY: requireEnv("EMAIL_API_KEY"),
  CONTEST_API_KEY: requireEnv("CONTEST_API_KEY"),
  TIMEZONE: requireEnv("TIMEZONE"),
};
