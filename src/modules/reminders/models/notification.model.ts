import mongoose, { Schema, Document } from "mongoose";

export enum NotificationType {
  MORNING = "morning",
  BEFORE_30_MIN = "before_30_min",
}

export interface NotificationDocument extends Document<string> {
  _id: string;
  contestId: string;
  type: NotificationType;
  sentAt: Date;
}

const NotificationSchema = new Schema<NotificationDocument>({
  _id: { type: String, required: true },

  contestId: {
    type: String,
    required: true,
    index: true,
  },

  type: {
    type: String,
    enum: Object.values(NotificationType),
    required: true,
  },

  sentAt: {
    type: Date,
    required: true,
  },
});

// ensures unique notification per contest + type
NotificationSchema.index({ contestId: 1, type: 1 }, { unique: true });

export const NotificationModel =
  mongoose.models.Notification ||
  mongoose.model<NotificationDocument>("Notification", NotificationSchema);
