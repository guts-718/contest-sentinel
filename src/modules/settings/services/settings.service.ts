import { SettingsModel } from "../model/settings.model";

export async function getSettings() {
  let settings = await SettingsModel.findOne();

  if (!settings) {
    settings = await SettingsModel.create({
      telegramEnabled: true,
      emailEnabled: false,
      emailAddress: "",
      timezone: "Asia/Kolkata",
    });
  }

  return settings;
}

export async function updateSettings(update: Partial<{
  telegramEnabled: boolean;
  emailEnabled: boolean;
  emailAddress: string;
  timezone: string;
}>) {
  return SettingsModel.findOneAndUpdate({}, update, { new: true, upsert: true });
}
