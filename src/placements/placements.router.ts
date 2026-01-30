import { Express, Request, Response, NextFunction } from "express";
import {
  createPlacementController,
  getAllPlacementsController,
  getPlacementByIdController,
  updatePlacementController,
  deletePlacementController,
  getUserPlacementsController,
} from "./placements.controller";

const PlacementsRoutes = (app: Express) => {
  /* =============================
     CREATE A NEW PLACEMENT
  ============================= */
  app.post(
    "/placement",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await createPlacementController(req, res);
      } catch (error) {
        console.error("Error in POST /placement:", error);
        next(error);
      }
    }
  );

  /* =============================
     GET ALL PLACEMENTS
  ============================= */
  app.get(
    "/placement",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getAllPlacementsController(req, res);
      } catch (error) {
        console.error("Error in GET /placement:", error);
        next(error);
      }
    }
  );

  /* =============================
     GET PLACEMENT BY ID
  ============================= */
  app.get(
    "/placement/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getPlacementByIdController(req, res);
      } catch (error) {
        console.error(`Error in GET /placement/${req.params.id}:`, error);
        next(error);
      }
    }
  );

  /* =============================
     UPDATE PLACEMENT BY ID
  ============================= */
  app.put(
    "/placement/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await updatePlacementController(req, res);
      } catch (error) {
        console.error(`Error in PUT /placement/${req.params.id}:`, error);
        next(error);
      }
    }
  );

  /* =============================
     DELETE PLACEMENT BY ID
  ============================= */
  app.delete(
    "/placement/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await deletePlacementController(req, res);
      } catch (error) {
        console.error(`Error in DELETE /placement/${req.params.id}:`, error);
        next(error);
      }
    }
  );

  /* =============================
     GET ALL PLACEMENTS FOR A SPECIFIC STUDENT
  ============================= */
  app.get(
    "/placement/student/:studentID",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Make sure the controller reads the correct param
        req.params.userID = req.params.studentID; 
        await getUserPlacementsController(req, res);
      } catch (error) {
        console.error(
          `Error in GET /placement/student/${req.params.studentID}:`,
          error
        );
        next(error);
      }
    }
  );
};

export default PlacementsRoutes;
