// src/applicationWindows/applicationWindows.controller.ts

import { Request, Response } from "express";
import {
  createWindowService,
  getAllWindowsService,
  getWindowByIdService,
  updateWindowService,
  deleteWindowService,
} from "./applicationWindows.service";

// ✅ Create a new application window
export const createWindowController = async (req: Request, res: Response) => {
  try {
    const window = req.body;

    if (!window.name || !window.startDate || !window.endDate) {
      return res.status(400).json({ message: "Name, start date, and end date are required." });
    }

    const createdWindow = await createWindowService(window);

    return res.status(201).json({
      message: "Application window created successfully",
      data: createdWindow,
    });
  } catch (error: any) {
    console.error("Error in createWindowController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all application windows
export const getAllWindowsController = async (_req: Request, res: Response) => {
  try {
    const windows = await getAllWindowsService();
    return res.status(200).json({ data: windows });
  } catch (error: any) {
    console.error("Error in getAllWindowsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

//  Get application window by ID
export const getWindowByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid window ID." });

    const window = await getWindowByIdService(id);
    if (!window) return res.status(404).json({ message: "Application window not found." });

    return res.status(200).json({ data: window });
  } catch (error: any) {
    console.error("Error in getWindowByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update application window by ID
export const updateWindowController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid window ID." });

    const updates = req.body;
    const result = await updateWindowService(id, updates);

    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updateWindowController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete application window by ID
export const deleteWindowController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid window ID." });

    const result = await deleteWindowService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteWindowController:", error);
    return res.status(500).json({ error: error.message });
  }
};
