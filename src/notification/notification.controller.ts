// src/notifications/notification.controller.ts

import { Request, Response } from "express";
import {
  createNotificationService,
  getAllNotificationsService,
  getUserNotificationsService,
  getNotificationByIdService,
  markNotificationAsReadService,
  deleteNotificationService,
} from "./notification.service";

/* =============================
   CREATE A NEW NOTIFICATION
============================= */
export const createNotificationController = async (req: Request, res: Response) => {
  try {
    const { userID, userRole, message } = req.body;

    if (!userID || !userRole || !message) {
      return res.status(400).json({
        message: "userID, userRole, and message are required.",
      });
    }

    const notification = await createNotificationService({
      userID,
      userRole,
      message,
    });

    return res.status(201).json({
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error: any) {
    console.error("Error in createNotificationController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ALL NOTIFICATIONS
============================= */
export const getAllNotificationsController = async (_req: Request, res: Response) => {
  try {
    const notifications = await getAllNotificationsService();
    return res.status(200).json({ data: notifications });
  } catch (error: any) {
    console.error("Error in getAllNotificationsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET NOTIFICATIONS BY USER
============================= */
export const getUserNotificationsController = async (req: Request, res: Response) => {
  try {
    const userID = parseInt(req.params.userID as string);
    const userRole = req.params.userRole as string;

    if (isNaN(userID) || !userRole) {
      return res.status(400).json({ message: "Invalid userID or userRole." });
    }

    const notifications = await getUserNotificationsService(userID, userRole);

    return res.status(200).json({ data: notifications });
  } catch (error: any) {
    console.error("Error in getUserNotificationsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET NOTIFICATION BY ID
============================= */
export const getNotificationByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid notification ID." });

    const notification = await getNotificationByIdService(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    return res.status(200).json({ data: notification });
  } catch (error: any) {
    console.error("Error in getNotificationByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   MARK NOTIFICATION AS READ
============================= */
export const markNotificationAsReadController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid notification ID." });

    const result = await markNotificationAsReadService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in markNotificationAsReadController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   DELETE NOTIFICATION BY ID
============================= */
export const deleteNotificationController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid notification ID." });

    const result = await deleteNotificationService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteNotificationController:", error);
    return res.status(500).json({ error: error.message });
  }
};
