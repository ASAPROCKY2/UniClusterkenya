// src/placements/placements.routes.ts
import { Express, Request, Response, NextFunction } from "express";
import {
  createPlacementController,
  autoPlacementController,
  getAllPlacementsController,
  getPlacementByIdController,
  updatePlacementController,
  deletePlacementController,
} from "./placements.controller";

import { getUserPlacementsService } from "./placements.service"; 

const PlacementsRoutes = (app: Express) => {
  /* =============================
     CREATE A NEW PLACEMENT (MANUAL)
  ============================= */
  app.post("/placement", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createPlacementController(req, res);
    } catch (error) {
      console.error("Error in POST /placement:", error);
      next(error);
    }
  });

  /* =============================
     AUTO PLACEMENT (NEW)
     Expects query parameter: ?year=2026
  ============================= */
  app.post("/placement/auto", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await autoPlacementController(req, res);
    } catch (error) {
      console.error("Error in POST /placement/auto:", error);
      next(error);
    }
  });

  /* =============================
     GET ALL PLACEMENTS
  ============================= */
  app.get("/placement", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllPlacementsController(req, res);
    } catch (error) {
      console.error("Error in GET /placement:", error);
      next(error);
    }
  });

  /* =============================
     GET PLACEMENT BY ID
  ============================= */
  app.get("/placement/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getPlacementByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /placement/${req.params.id}:`, error);
      next(error);
    }
  });

  /* =============================
     UPDATE PLACEMENT BY ID
  ============================= */
  app.put("/placement/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updatePlacementController(req, res);
    } catch (error) {
      console.error(`Error in PUT /placement/${req.params.id}:`, error);
      next(error);
    }
  });

  /* =============================
     DELETE PLACEMENT BY ID
  ============================= */
  app.delete("/placement/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deletePlacementController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /placement/${req.params.id}:`, error);
      next(error);
    }
  });

  /* =============================
     GET ALL PLACEMENTS FOR A STUDENT
     Maps studentID → userID safely
  ============================= */
  app.get("/placement/student/:studentID", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userID = Number(req.params.studentID);
      if (isNaN(userID)) {
        return res.status(400).json({ message: "Invalid student ID." });
      }

      // Call the service directly
      const placements = await getUserPlacementsService(userID);
      return res.status(200).json({ data: placements });
    } catch (error) {
      console.error(`Error in GET /placement/student/${req.params.studentID}:`, error);
      next(error);
    }
  });
};

export default PlacementsRoutes;
