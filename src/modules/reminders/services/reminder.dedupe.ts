import { NotificationModel, NotificationType } from "../models/notification.model";

/**
 * Checks if notification already sent
 */
export async function alreadySent(
  contestId: string,
  type: NotificationType
): Promise<boolean> {
  const exists = await NotificationModel.exists({
    contestId,
    type,
  });

  return !!exists;
}

/**
 * Records notification as sent
 */
export async function markSent(
  contestId: string,
  type: NotificationType
): Promise<void> {
  const id = `${contestId}:${type}`;

  await NotificationModel.updateOne(
    { _id: id },
    {
      $set: {
        _id: id,
        contestId,
        type,
        sentAt: new Date(),
      },
    },
    { upsert: true }
  );
}
