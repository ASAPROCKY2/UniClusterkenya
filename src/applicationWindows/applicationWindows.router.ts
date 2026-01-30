// src/applicationWindows/applicationWindows.router.ts

import { Express, Request, Response, NextFunction } from "express";
import {
  createWindowController,
  getAllWindowsController,
  getWindowByIdController,
  updateWindowController,
  deleteWindowController,
} from "./applicationWindows.controller";

const ApplicationWindowsRoutes = (app: Express) => {
  
  // ✅ Create a new application window
  app.post("/application-window", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createWindowController(req, res);
    } catch (error) {
      console.error("Error in POST /application-window:", error);
      next(error);
    }
  });

  // ✅ Get all application windows
  app.get("/application-window", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllWindowsController(req, res);
    } catch (error) {
      console.error("Error in GET /application-window:", error);
      next(error);
    }
  });

  // ✅ Get application window by ID
  app.get("/application-window/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getWindowByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /application-window/${req.params.id}:`, error);
      next(error);
    }
  });

  // Update application window by ID
  app.put("/application-window/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateWindowController(req, res);
    } catch (error) {
      console.error(`Error in PUT /application-window/${req.params.id}:`, error);
      next(error);
    }
  });

  //  Delete application window by ID
  app.delete("/application-window/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteWindowController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /application-window/${req.params.id}:`, error);
      next(error);
    }
  });
};

export default ApplicationWindowsRoutes;
