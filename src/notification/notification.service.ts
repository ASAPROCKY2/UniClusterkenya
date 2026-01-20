// src/notifications/notification.service.ts

import { eq, and } from "drizzle-orm";
import db from "../Drizzle/db";
import { NotificationsTable } from "../Drizzle/schema";

/* =============================
   CREATE A NEW NOTIFICATION
============================= */
export const createNotificationService = async (notification: {
  userID: number;
  userRole: string;
  message: string;
}) => {
  const [newNotification] = await db
    .insert(NotificationsTable)
    .values({
      userID: notification.userID,
      userRole: notification.userRole,
      message: notification.message,
      isRead: false,
      createdAt: new Date().toISOString(),
    } as any)
    .returning();

  return newNotification;
};

/* =============================
   GET ALL NOTIFICATIONS
============================= */
export const getAllNotificationsService = async () => {
  return await db.query.NotificationsTable.findMany({
    orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
  });
};

/* =============================
   GET NOTIFICATIONS BY USER
============================= */
export const getUserNotificationsService = async (
  userID: number,
  userRole: string
) => {
  return await db.query.NotificationsTable.findMany({
    where: and(
      eq(NotificationsTable.userID, userID),
      eq(NotificationsTable.userRole, userRole)
    ),
    orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
  });
};

/* =============================
   GET NOTIFICATION BY ID
============================= */
export const getNotificationByIdService = async (id: number) => {
  return await db.query.NotificationsTable.findFirst({
    where: eq(NotificationsTable.notificationID, id),
  });
};

/* =============================
   MARK NOTIFICATION AS READ
============================= */
export const markNotificationAsReadService = async (id: number) => {
  await db
    .update(NotificationsTable)
    .set({ isRead: true })
    .where(eq(NotificationsTable.notificationID, id));

  return "Notification marked as read";
};

/* =============================
   DELETE NOTIFICATION BY ID
============================= */
export const deleteNotificationService = async (id: number) => {
  await db
    .delete(NotificationsTable)
    .where(eq(NotificationsTable.notificationID, id));

  return "Notification deleted successfully";
};
