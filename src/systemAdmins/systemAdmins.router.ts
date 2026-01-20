import { Express, Request, Response, NextFunction } from "express";
import {
  createSystemAdminController,
  getAllSystemAdminsController,
  getSystemAdminByIdController,
  updateSystemAdminController,
  deleteSystemAdminController,
} from "./systemAdmins.controller";

const SystemAdminsRoutes = (app: Express) => {

  // Create a new system admin
  app.post("/system-admin", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createSystemAdminController(req, res);
    } catch (error) {
      console.error("Error in POST /system-admin:", error);
      next(error);
    }
  });

  // Get all system admins
  app.get("/system-admin", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllSystemAdminsController(req, res);
    } catch (error) {
      console.error("Error in GET /system-admin:", error);
      next(error);
    }
  });

  // Get system admin by ID
  app.get("/system-admin/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getSystemAdminByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /system-admin/${req.params.id}:`, error);
      next(error);
    }
  });

  // Update system admin by ID
  app.put("/system-admin/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateSystemAdminController(req, res);
    } catch (error) {
      console.error(`Error in PUT /system-admin/${req.params.id}:`, error);
      next(error);
    }
  });

  // Delete system admin by ID
  app.delete("/system-admin/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteSystemAdminController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /system-admin/${req.params.id}:`, error);
      next(error);
    }
  });

};

export default SystemAdminsRoutes;