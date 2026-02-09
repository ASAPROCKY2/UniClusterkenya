// src/applications/applications.router.ts

import { Express, Request, Response, NextFunction } from "express";
import {
  createApplicationController,
  getAllApplicationsController,
  getApplicationByIdController,
  updateApplicationController,
  deleteApplicationController,
  getUserApplicationsController,
} from "./studentsApplication.controller"; // Updated import

const ApplicationsRoutes = (app: Express) => {
  
  // =============================
  // Create a new student application
  // =============================
  app.post("/application", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createApplicationController(req, res);
    } catch (error) {
      console.error("Error in POST /application:", error);
      next(error);
    }
  });

  // =============================
  // Get all student applications
  // =============================
  app.get("/application", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllApplicationsController(req, res);
    } catch (error) {
      console.error("Error in GET /application:", error);
      next(error);
    }
  });

  // =============================
  // Get application by ID
  // =============================
  app.get("/application/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getApplicationByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /application/${req.params.id}:`, error);
      next(error);
    }
  });

  // =============================
  // Update application by ID
  // =============================
  app.put("/application/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateApplicationController(req, res);
    } catch (error) {
      console.error(`Error in PUT /application/${req.params.id}:`, error);
      next(error);
    }
  });

  // =============================
  // Delete application by ID
  // =============================
  app.delete("/application/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteApplicationController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /application/${req.params.id}:`, error);
      next(error);
    }
  });

  // =============================
  // Get all applications for a specific student (by studentID)
  // =============================
  app.get("/application/student/:studentID", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUserApplicationsController(req, res);
    } catch (error) {
      console.error(`Error in GET /application/student/${req.params.studentID}:`, error);
      next(error);
    }
  });

  // =============================
  // Optional: Get all applications for a user (by userID)
  // =============================
  app.get("/application/user/:userID", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUserApplicationsController(req, res);
    } catch (error) {
      console.error(`Error in GET /application/user/${req.params.userID}:`, error);
      next(error);
    }
  });

};

export default ApplicationsRoutes;
