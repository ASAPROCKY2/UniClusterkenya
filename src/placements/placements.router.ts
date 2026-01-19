import { Express, Request, Response, NextFunction } from "express";
import {
  createPlacementController,
  getAllPlacementsController,
  getPlacementByIdController,
  updatePlacementController,
  deletePlacementController,
  getStudentPlacementsController,
} from "./placements.controller";

const PlacementsRoutes = (app: Express) => {

  // Create a new placement
  app.post("/placement", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createPlacementController(req, res);
    } catch (error) {
      console.error("Error in POST /placement:", error);
      next(error);
    }
  });

  // Get all placements
  app.get("/placement", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllPlacementsController(req, res);
    } catch (error) {
      console.error("Error in GET /placement:", error);
      next(error);
    }
  });

  // Get placement by ID
  app.get("/placement/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getPlacementByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /placement/${req.params.id}:`, error);
      next(error);
    }
  });

  // Update placement by ID
  app.put("/placement/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updatePlacementController(req, res);
    } catch (error) {
      console.error(`Error in PUT /placement/${req.params.id}:`, error);
      next(error);
    }
  });

  // Delete placement by ID
  app.delete("/placement/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deletePlacementController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /placement/${req.params.id}:`, error);
      next(error);
    }
  });

  // Get all placements for a specific student
  app.get("/placement/student/:studentID", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getStudentPlacementsController(req, res);
    } catch (error) {
      console.error(`Error in GET /placement/student/${req.params.studentID}:`, error);
      next(error);
    }
  });

};

export default PlacementsRoutes;
