// src/kcseresults/kcseresults.router.ts
import { Express, Request, Response, NextFunction } from "express";
import {
  createKcseResultController,
  getAllKcseResultsController,
  getKcseResultByIdController,
  updateKcseResultController,
  deleteKcseResultController,
  getStudentKcseResultsController,
} from "./KcseResults.controller";

const KcseResultsRoutes = (app: Express) => {

  // ✅ Create a new KCSE result
  app.post("/kcseresult", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createKcseResultController(req, res);
    } catch (error) {
      console.error("Error in POST /kcseresult:", error);
      next(error);
    }
  });

  // ✅ Get all KCSE results
  app.get("/kcseresult", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllKcseResultsController(req, res);
    } catch (error) {
      console.error("Error in GET /kcseresult:", error);
      next(error);
    }
  });

  // ✅ Get KCSE result by ID
  app.get("/kcseresult/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getKcseResultByIdController(req, res);
    } catch (error) {
      console.error(`Error in GET /kcseresult/${req.params.id}:`, error);
      next(error);
    }
  });

  // ✅ Update KCSE result by ID
  app.put("/kcseresult/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateKcseResultController(req, res);
    } catch (error) {
      console.error(`Error in PUT /kcseresult/${req.params.id}:`, error);
      next(error);
    }
  });

  // ✅ Delete KCSE result by ID
  app.delete("/kcseresult/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteKcseResultController(req, res);
    } catch (error) {
      console.error(`Error in DELETE /kcseresult/${req.params.id}:`, error);
      next(error);
    }
  });

  // ✅ Get all KCSE results for a specific student
  app.get("/kcseresult/student/:studentID", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getStudentKcseResultsController(req, res);
    } catch (error) {
      console.error(`Error in GET /kcseresult/student/${req.params.studentID}:`, error);
      next(error);
    }
  });

};

export default KcseResultsRoutes;
