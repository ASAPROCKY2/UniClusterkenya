// src/programmes/programmeWindow.router.ts
import { Express, Request, Response, NextFunction } from "express";
import {
  createApplicationWindowController,
  getAllApplicationWindowsController,
  getApplicationWindowByIdController,
  updateApplicationWindowController,
  deleteApplicationWindowController,
  getActiveApplicationWindowsController,
  filterApplicationWindowsController,
} from "./applicationWindows.controller";

const ProgrammeWindowRoutes = (app: Express) => {
  
  // Create a new application window
  app.post("/application-window", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createApplicationWindowController(req, res);
    } catch (error) {
      console.error("Error in POST /application-window:", error);
      next(error);
    }
  });

  // Get all application windows
  app.get("/application-window", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllApplicationWindowsController(req, res);
    } catch (error) {
      console.error("Error in GET /application-window:", error);
      next(error);
    }
  });

  // Get application window by ID
  app.get("/application-window/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getApplicationWindowByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /application-window/${req.params.id}:`, error);
      next(error);
    }
  });

  // Update application window by ID
  app.put("/application-window/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateApplicationWindowController(req, res);
    } catch (error) {
      console.error(`Error in PUT /application-window/${req.params.id}:`, error);
      next(error);
    }
  });

  // Delete application window by ID
  app.delete("/application-window/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteApplicationWindowController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /application-window/${req.params.id}:`, error);
      next(error);
    }
  });

  // Get all active application windows
  app.get("/application-window/active", async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await getActiveApplicationWindowsController(_req, res);
    } catch (error) {
      console.error("Error in GET /application-window/active:", error);
      next(error);
    }
  });

  // Filter application windows
  app.get("/application-window/filter", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await filterApplicationWindowsController(req, res);
    } catch (error) {
      console.error("Error in GET /application-window/filter:", error);
      next(error);
    }
  });
};

export default ProgrammeWindowRoutes;
