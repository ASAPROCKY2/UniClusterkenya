// src/dashboard/dashboard.routes.ts
import { Express, Request, Response, NextFunction } from "express";
import {
  getDashboardStatsController,
  getPlacementsPerMonthController,
  getApplicationsPerMonthController,
  getAnalyticsController,
} from "./dashboard.controller";

const DashboardRoutes = (app: Express) => {
  // Main dashboard totals
  app.get(
    "/admin/dashboard-stats",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getDashboardStatsController(req, res);
      } catch (error) {
        console.error("Error in /admin/dashboard-stats route:", error);
        next(error);
      }
    }
  );

  // ✅ Placements grouped by month
  app.get(
    "/admin/analytics/placements-per-month",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getPlacementsPerMonthController(req, res);
      } catch (error) {
        console.error("Error in /admin/analytics/placements-per-month route:", error);
        next(error);
      }
    }
  );

  //  Applications grouped by month
  app.get(
    "/admin/analytics/applications-per-month",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getApplicationsPerMonthController(req, res);
      } catch (error) {
        console.error("Error in /admin/analytics/applications-per-month route:", error);
        next(error);
      }
    }
  );

  // ✅ Combined analytics (placements + applications)
  app.get(
    "/admin/analytics",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getAnalyticsController(req, res);
      } catch (error) {
        console.error("Error in /admin/analytics route:", error);
        next(error);
      }
    }
  );
};

export default DashboardRoutes;
