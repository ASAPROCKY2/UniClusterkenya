// src/placements/placements.controller.ts
import { Request, Response } from "express";
import {
  createPlacementService,
  getAllPlacementsService,
  getPlacementByIdService,
  updatePlacementService,
  deletePlacementService,
  getUserPlacementsService,
  autoPlacementService,
} from "./placements.service";

/* =============================
   CREATE A NEW PLACEMENT
============================= */
export const createPlacementController = async (req: Request, res: Response) => {
  try {
    const { userID, programmeID, universityID, applicationID, year, placementDate } = req.body;

    // Validate required fields
    if (!userID || !programmeID || !universityID || !applicationID || !year) {
      return res.status(400).json({
        message: "userID, programmeID, universityID, applicationID, and year are required.",
      });
    }

    const newPlacement = await createPlacementService({
      userID,
      programmeID,
      universityID,
      applicationID,
      year,
      placementDate,
    });

    return res.status(201).json({
      message: "Placement created successfully",
      data: newPlacement,
    });
  } catch (error: any) {
    console.error("Error in createPlacementController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   AUTO PLACEMENT (NEW)
============================= */
export const autoPlacementController = async (_req: Request, res: Response) => {
  try {
    const year = Number(_req.query.year);
    if (isNaN(year)) {
      return res.status(400).json({ message: "Invalid year provided." });
    }

    const placements = await autoPlacementService(year);

    return res.status(201).json({
      message: "Auto placement completed successfully",
      data: placements,
    });
  } catch (error: any) {
    console.error("Error in autoPlacementController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ALL PLACEMENTS
============================= */
export const getAllPlacementsController = async (_req: Request, res: Response) => {
  try {
    const placements = await getAllPlacementsService();
    return res.status(200).json({ data: placements });
  } catch (error: any) {
    console.error("Error in getAllPlacementsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET PLACEMENT BY ID
============================= */
export const getPlacementByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid placement ID." });
    }

    const placement = await getPlacementByIdService(id);
    if (!placement) {
      return res.status(404).json({ message: "Placement not found." });
    }

    return res.status(200).json({ data: placement });
  } catch (error: any) {
    console.error("Error in getPlacementByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   UPDATE PLACEMENT
============================= */
export const updatePlacementController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid placement ID." });
    }

    const result = await updatePlacementService(id, req.body);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updatePlacementController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   DELETE PLACEMENT
============================= */
export const deletePlacementController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid placement ID." });
    }

    const result = await deletePlacementService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deletePlacementController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ALL PLACEMENTS FOR A USER
============================= */
export const getUserPlacementsController = async (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.userID);
    if (isNaN(userID)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const placements = await getUserPlacementsService(userID);
    return res.status(200).json({ data: placements });
  } catch (error: any) {
    console.error("Error in getUserPlacementsController:", error);
    return res.status(500).json({ error: error.message });
  }
};
