// src/programmes/programmeWindow.controller.ts
import { Request, Response } from "express";
import {
  createApplicationWindowService,
  getAllApplicationWindowsService,
  getApplicationWindowByIdService,
  updateApplicationWindowService,
  deleteApplicationWindowService,
  getActiveApplicationWindowsService,
  filterApplicationWindowsService,
} from "./applicationWindows.service";
import { TIApplicationWindow, TSApplicationWindow } from "../Drizzle/schema";

/* =============================
   CREATE A NEW APPLICATION WINDOW
============================= */
export const createApplicationWindowController = async (req: Request, res: Response) => {
  try {
    const payload: TIApplicationWindow = req.body;

    if (
      !payload.name ||
      !payload.startDate ||
      !payload.endDate ||
      !payload.programmeID ||
      payload.totalSlots === undefined
    ) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const createdWindow: TSApplicationWindow = await createApplicationWindowService({
      name: payload.name,
      startDate: payload.startDate,
      endDate: payload.endDate,
      programmeID: payload.programmeID,
      totalSlots: payload.totalSlots,
    });

    return res.status(201).json({
      message: "Application window created successfully",
      data: createdWindow,
    });
  } catch (error: any) {
    console.error("Error in createApplicationWindowController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ALL APPLICATION WINDOWS
============================= */
export const getAllApplicationWindowsController = async (_req: Request, res: Response) => {
  try {
    const windows: TSApplicationWindow[] = await getAllApplicationWindowsService();
    return res.status(200).json({ data: windows });
  } catch (error: any) {
    console.error("Error in getAllApplicationWindowsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET APPLICATION WINDOW BY ID
============================= */
export const getApplicationWindowByIdController = async (req: Request, res: Response) => {
  try {
    const windowID = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    if (isNaN(windowID)) return res.status(400).json({ message: "Invalid window ID." });

    const window: TSApplicationWindow | null = await getApplicationWindowByIdService(windowID);
    if (!window) return res.status(404).json({ message: "Application window not found." });

    return res.status(200).json({ data: window });
  } catch (error: any) {
    console.error("Error in getApplicationWindowByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   UPDATE APPLICATION WINDOW BY ID
============================= */
export const updateApplicationWindowController = async (req: Request, res: Response) => {
  try {
    const windowID = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    if (isNaN(windowID)) return res.status(400).json({ message: "Invalid window ID." });

    const updates: Partial<TIApplicationWindow> = req.body;

    // Normalize isActive: convert explicit null to undefined so it matches the service signature (boolean | undefined)
    if ('isActive' in updates && updates.isActive === null) {
      (updates as any).isActive = undefined;
    }

    const result = await updateApplicationWindowService(windowID, updates as any);
    return res.status(200).json({ message: "Application window updated successfully", data: result });
  } catch (error: any) {
    console.error("Error in updateApplicationWindowController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   DELETE APPLICATION WINDOW BY ID
============================= */
export const deleteApplicationWindowController = async (req: Request, res: Response) => {
  try {
    const windowID = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    if (isNaN(windowID)) return res.status(400).json({ message: "Invalid window ID." });

    const result = await deleteApplicationWindowService(windowID);
    return res.status(200).json({ message: "Application window deleted successfully", data: result });
  } catch (error: any) {
    console.error("Error in deleteApplicationWindowController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ACTIVE APPLICATION WINDOWS
============================= */
export const getActiveApplicationWindowsController = async (_req: Request, res: Response) => {
  try {
    const windows: TSApplicationWindow[] = await getActiveApplicationWindowsService();
    return res.status(200).json({ data: windows });
  } catch (error: any) {
    console.error("Error in getActiveApplicationWindowsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   FILTER APPLICATION WINDOWS
============================= */
export const filterApplicationWindowsController = async (req: Request, res: Response) => {
  try {
    const filters = req.query; // expecting programmeID, isActive, startDate, endDate
    const parsedFilters: any = {};

    if (filters.programmeID) parsedFilters.programmeID = parseInt(filters.programmeID as string);
    if (filters.isActive !== undefined) parsedFilters.isActive = filters.isActive === "true";
    if (filters.startDate) parsedFilters.startDate = filters.startDate;
    if (filters.endDate) parsedFilters.endDate = filters.endDate;

    const windows: TSApplicationWindow[] = await filterApplicationWindowsService(parsedFilters);
    return res.status(200).json({ data: windows });
  } catch (error: any) {
    console.error("Error in filterApplicationWindowsController:", error);
    return res.status(500).json({ error: error.message });
  }
};
