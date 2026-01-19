// src/programmes/programme.router.ts
import { Express, Request, Response, NextFunction } from "express";
import {
  createProgrammeController,
  getAllProgrammesController,
  getProgrammeByIdController,
  updateProgrammeController,
  deleteProgrammeController,
  getProgrammeWithApplicationsController,
} from "./programmes.controller";

const ProgrammeRoutes = (app: Express) => {
  
  // ✅ Create a new programme
  app.post("/programme", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createProgrammeController(req, res);
    } catch (error) {
      console.error("Error in POST /programme:", error);
      next(error);
    }
  });

  // ✅ Get all programmes
  app.get("/programme", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllProgrammesController(req, res);
    } catch (error) {
      console.error("Error in GET /programme:", error);
      next(error);
    }
  });

  // ✅ Get programme by ID
  app.get("/programme/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getProgrammeByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /programme/${req.params.id}:`, error);
      next(error);
    }
  });

  // ✅ Update programme by ID
  app.put("/programme/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateProgrammeController(req, res);
    } catch (error) {
      console.error(`Error in PUT /programme/${req.params.id}:`, error);
      next(error);
    }
  });

  // ✅ Delete programme by ID
  app.delete("/programme/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteProgrammeController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /programme/${req.params.id}:`, error);
      next(error);
    }
  });

  // ✅ Get programme with applications and placements
  app.get("/programme/full/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getProgrammeWithApplicationsController(req, res);
    } catch (error) {
      console.error(`Error in GET /programme/full/${req.params.id}:`, error);
      next(error);
    }
  });
};

export default ProgrammeRoutes;
