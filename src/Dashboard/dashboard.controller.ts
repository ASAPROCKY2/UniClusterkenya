// src/dashboard/dashboard.controller.ts
import { Request, Response } from "express";
import {
  getDashboardStatsService,
  getPlacementsPerMonthService,
  getApplicationsPerMonthService,
  getAnalyticsService,
} from "./dashboard.service";

//  Main dashboard totals
export const getDashboardStatsController = async (_req: Request, res: Response) => {
  try {
    const stats = await getDashboardStatsService();
    return res.status(200).json(stats);
  } catch (error: any) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      error: "Failed to fetch dashboard stats",
      details: error?.message ?? "Unknown error",
    });
  }
};

//  Placements grouped by month
export const getPlacementsPerMonthController = async (_req: Request, res: Response) => {
  try {
    const data = await getPlacementsPerMonthService();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching placements per month:", error);
    return res.status(500).json({
      error: "Failed to fetch placements per month",
      details: error?.message ?? "Unknown error",
    });
  }
};

//  Applications grouped by month
export const getApplicationsPerMonthController = async (_req: Request, res: Response) => {
  try {
    const data = await getApplicationsPerMonthService();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching applications per month:", error);
    return res.status(500).json({
      error: "Failed to fetch applications per month",
      details: error?.message ?? "Unknown error",
    });
  }
};

//  Combined analytics (all grouped data at once)
export const getAnalyticsController = async (_req: Request, res: Response) => {
  try {
    const data = await getAnalyticsService();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching combined analytics:", error);
    return res.status(500).json({
      error: "Failed to fetch combined analytics",
      details: error?.message ?? "Unknown error",
    });
  }
};
