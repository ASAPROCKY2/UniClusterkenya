import { Express, Request, Response, NextFunction } from "express";
import {
  createProgrammeController,
  getAllProgrammesController,
  getProgrammeByIdController,
  updateProgrammeController,
  deleteProgrammeController,
  getProgrammeLevelsController,
  getProgrammeClustersController,
  getProgrammesByLevelController,
  getProgrammesByClusterController,
  filterProgrammesController,
} from "./programmes.controller";

const ProgrammeRoutes = (app: Express) => {

  /* =============================
     CREATE & LIST
  ============================= */

  app.post("/programme", async (req, res, next) => {
    try {
      await createProgrammeController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.get("/programme", async (req, res, next) => {
    try {
      await getAllProgrammesController(req, res);
    } catch (error) {
      next(error);
    }
  });

  /* =============================
     STATIC ROUTES (MUST COME FIRST)
  ============================= */

  app.get("/programme/levels", async (req, res, next) => {
    try {
      await getProgrammeLevelsController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.get("/programme/clusters", async (req, res, next) => {
    try {
      await getProgrammeClustersController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.get("/programme/filter", async (req, res, next) => {
    try {
      await filterProgrammesController(req, res);
    } catch (error) {
      next(error);
    }
  });

  /* =============================
     SEMI-DYNAMIC ROUTES
  ============================= */

  app.get("/programme/level/:level", async (req, res, next) => {
    try {
      await getProgrammesByLevelController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.get("/programme/cluster/:clusterID", async (req, res, next) => {
    try {
      await getProgrammesByClusterController(req, res);
    } catch (error) {
      next(error);
    }
  });

  /* =============================
     DYNAMIC ID ROUTES (LAST)
  ============================= */

  app.get("/programme/:id", async (req, res, next) => {
    try {
      await getProgrammeByIdController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.put("/programme/:id", async (req, res, next) => {
    try {
      await updateProgrammeController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/programme/:id", async (req, res, next) => {
    try {
      await deleteProgrammeController(req, res);
    } catch (error) {
      next(error);
    }
  });
};

export default ProgrammeRoutes;
