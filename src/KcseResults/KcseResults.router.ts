import { Express, Request, Response, NextFunction } from "express";
import {
  createKcseResultController,
  getAllKcseResultsController,
  getKcseResultsByUserIdController,
  updateKcseResultsByUserIdController,
  deleteKcseResultsByUserIdController,
  getStudentKcseResultsController,
} from "./KcseResults.controller";

const KcseResultsRoutes = (app: Express) => {

  // ===============================
  // Create a new KCSE result
  // ===============================
  app.post(
    "/kcseresult",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await createKcseResultController(req, res);
      } catch (error) {
        console.error("Error in POST /kcseresult:", error);
        next(error);
      }
    }
  );

  // ===============================
  // Get all KCSE results
  // ===============================
  app.get(
    "/kcseresult",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getAllKcseResultsController(req, res);
      } catch (error) {
        console.error("Error in GET /kcseresult:", error);
        next(error);
      }
    }
  );

  // ===============================
  // Get KCSE results by userID
  // ===============================
  app.get(
    "/kcseresult/user/:userID",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getKcseResultsByUserIdController(req, res);
      } catch (error) {
        console.error(
          `Error in GET /kcseresult/user/${req.params.userID}:`,
          error
        );
        next(error);
      }
    }
  );

  // ===============================
  // Update KCSE results by userID
  // ===============================
  app.put(
    "/kcseresult/user/:userID",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await updateKcseResultsByUserIdController(req, res);
      } catch (error) {
        console.error(
          `Error in PUT /kcseresult/user/${req.params.userID}:`,
          error
        );
        next(error);
      }
    }
  );

  // ===============================
  // Delete KCSE results by userID
  // ===============================
  app.delete(
    "/kcseresult/user/:userID",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await deleteKcseResultsByUserIdController(req, res);
      } catch (error) {
        console.error(
          `Error in DELETE /kcseresult/user/${req.params.userID}:`,
          error
        );
        next(error);
      }
    }
  );

  // ===============================
  // Get all KCSE results for a student (same as userID)
  // ===============================
  app.get(
    "/kcseresult/student/:userID",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getStudentKcseResultsController(req, res);
      } catch (error) {
        console.error(
          `Error in GET /kcseresult/student/${req.params.userID}:`,
          error
        );
        next(error);
      }
    }
  );
};

export default KcseResultsRoutes;
