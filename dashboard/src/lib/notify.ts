export async function requestPermission() {
  if (!("Notification" in window)) return false;

  if (Notification.permission === "granted") return true;

  const perm = await Notification.requestPermission();
  return perm === "granted";
}

export function sendNotification(title: string, body: string) {
  if (Notification.permission !== "granted") return;

  new Notification(title, {
    body,
    icon: "/icon.png",
  });
}