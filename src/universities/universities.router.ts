// src/universities/university.router.ts
import { Express, Request, Response, NextFunction } from "express";
import {
  createUniversityController,
  getAllUniversitiesController,
  getUniversityByIdController,
  updateUniversityController,
  deleteUniversityController,
  getUniversityWithProgrammesController,
} from "./universities.controller";

const UniversityRoutes = (app: Express) => {
  
  //  Create a new university
  app.post("/university", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createUniversityController(req, res);
    } catch (error) {
      console.error("Error in POST /university:", error);
      next(error);
    }
  });

  //  Get all universities
  app.get("/university", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllUniversitiesController(req, res);
    } catch (error) {
      console.error("Error in GET /university:", error);
      next(error);
    }
  });

  //  Get university by ID
  app.get("/university/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUniversityByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /university/${req.params.id}:`, error);
      next(error);
    }
  });

  //  Update university by ID
  app.put("/university/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUniversityController(req, res);
    } catch (error) {
      console.error(`Error in PUT /university/${req.params.id}:`, error);
      next(error);
    }
  });

  // Delete university by ID
  app.delete("/university/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteUniversityController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /university/${req.params.id}:`, error);
      next(error);
    }
  });

  // Get university with programmes and admins
  app.get("/university/full/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUniversityWithProgrammesController(req, res);
    } catch (error) {
      console.error(`Error in GET /university/full/${req.params.id}:`, error);
      next(error);
    }
  });

};

export default UniversityRoutes;
