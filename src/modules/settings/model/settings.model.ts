import mongoose, { Schema, Document } from "mongoose";

export interface SettingsDocument extends Document {
  telegramEnabled: boolean;
  emailEnabled: boolean;
  emailAddress: string;
  timezone: string;
}

const SettingsSchema = new Schema<SettingsDocument>({
  telegramEnabled: { type: Boolean, required: true },
  emailEnabled: { type: Boolean, required: true },
  emailAddress: { type: String, required: true },
  timezone: { type: String, required: true },
});

export const SettingsModel =
  mongoose.models.Settings ||
  mongoose.model<SettingsDocument>("Settings", SettingsSchema);
