// src/notifications/notification.router.ts

import { Express, Request, Response, NextFunction } from "express";
import {
  createNotificationController,
  getAllNotificationsController,
  getUserNotificationsController,
  getNotificationByIdController,
  markNotificationAsReadController,
  deleteNotificationController,
} from "./notification.controller";

const NotificationRoutes = (app: Express) => {

  //Create notification
  app.post("/notification", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createNotificationController(req, res);
    } catch (error) {
      console.error("Error in POST /notification:", error);
      next(error);
    }
  });

  //Get all notifications
  app.get("/notification", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllNotificationsController(req, res);
    } catch (error) {
      console.error("Error in GET /notification:", error);
      next(error);
    }
  });

  //Get notifications by user
  app.get(
    "/notification/user/:userRole/:userID",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getUserNotificationsController(req, res);
      } catch (error) {
        console.error(
          `Error in GET /notification/user/${req.params.userRole}/${req.params.userID}:`,
          error
        );
        next(error);
      }
    }
  );

  //  Get notification by ID
  app.get("/notification/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getNotificationByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /notification/${req.params.id}:`, error);
      next(error);
    }
  });

  //  Mark notification as read
  app.put(
    "/notification/read/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await markNotificationAsReadController(req, res);
      } catch (error) {
        console.error(`Error in PUT /notification/read/${req.params.id}:`, error);
        next(error);
      }
    }
  );

  //  Delete notification
  app.delete("/notification/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteNotificationController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /notification/${req.params.id}:`, error);
      next(error);
    }
  });
};

export default NotificationRoutes;
