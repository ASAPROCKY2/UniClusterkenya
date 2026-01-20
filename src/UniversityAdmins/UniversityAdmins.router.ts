import { Express, Request, Response, NextFunction } from "express";
import {
  createUniversityAdminController,
  getAllUniversityAdminsController,
  getUniversityAdminByIdController,
  updateUniversityAdminController,
  deleteUniversityAdminController,
  getUniversityAdminsByUniversityController,
} from "./UniversityAdmins.controller";

const UniversityAdminsRoutes = (app: Express) => {

  // Create a new university admin
  app.post("/university-admin", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createUniversityAdminController(req, res);
    } catch (error) {
      console.error("Error in POST /university-admin:", error);
      next(error);
    }
  });

  // Get all university admins
  app.get("/university-admin", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllUniversityAdminsController(req, res);
    } catch (error) {
      console.error("Error in GET /university-admin:", error);
      next(error);
    }
  });

  // Get university admin by ID
  app.get("/university-admin/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUniversityAdminByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /university-admin/${req.params.id}:`, error);
      next(error);
    }
  });

  // Update university admin by ID
  app.put("/university-admin/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUniversityAdminController(req, res);
    } catch (error) {
      console.error(`Error in PUT /university-admin/${req.params.id}:`, error);
      next(error);
    }
  });

  // Delete university admin by ID
  app.delete("/university-admin/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteUniversityAdminController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /university-admin/${req.params.id}:`, error);
      next(error);
    }
  });

  // Get all university admins for a specific university
  app.get("/university-admin/university/:universityID", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUniversityAdminsByUniversityController(req, res);
    } catch (error) {
      console.error(`Error in GET /university-admin/university/${req.params.universityID}:`, error);
      next(error);
    }
  });

};

export default UniversityAdminsRoutes;
