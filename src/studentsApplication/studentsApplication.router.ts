// src/applications/applications.router.ts

import { Express, Request, Response, NextFunction } from "express";
import {
  createApplicationController,
  getAllApplicationsController,
  getApplicationByIdController,
  updateApplicationController,
  deleteApplicationController,
  getStudentApplicationsController,
} from "./studentsApplication.controller";

const ApplicationsRoutes = (app: Express) => {
  
  // ✅ Create a new student application
  app.post("/application", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createApplicationController(req, res);
    } catch (error) {
      console.error("Error in POST /application:", error);
      next(error);
    }
  });

  // ✅ Get all student applications
  app.get("/application", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllApplicationsController(req, res);
    } catch (error) {
      console.error("Error in GET /application:", error);
      next(error);
    }
  });

  // ✅ Get application by ID
  app.get("/application/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getApplicationByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /application/${req.params.id}:`, error);
      next(error);
    }
  });

  // ✅ Update application by ID
  app.put("/application/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateApplicationController(req, res);
    } catch (error) {
      console.error(`Error in PUT /application/${req.params.id}:`, error);
      next(error);
    }
  });

  // ✅ Delete application by ID
  app.delete("/application/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteApplicationController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /application/${req.params.id}:`, error);
      next(error);
    }
  });

  //  Get all applications for a specific student
  app.get("/application/student/:studentID", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getStudentApplicationsController(req, res);
    } catch (error) {
      console.error(`Error in GET /application/student/${req.params.studentID}:`, error);
      next(error);
    }
  });

};

export default ApplicationsRoutes;
