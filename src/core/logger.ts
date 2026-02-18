type LogLevel = "BOOT" | "DB" | "API" | "CRON" | "ERROR" | "INFO";

function format(level: LogLevel, message: string) {
  const time = new Date().toISOString();
  return `[${time}] [${level}] ${message}`;
}

export const log = {
  boot: (msg: string) => console.log(format("BOOT", msg)),
  db: (msg: string) => console.log(format("DB", msg)),
  api: (msg: string) => console.log(format("API", msg)),
  cron: (msg: string) => console.log(format("CRON", msg)),
  info: (msg: string) => console.log(format("INFO", msg)),
  error: (msg: string) => console.error(format("ERROR", msg)),
};
