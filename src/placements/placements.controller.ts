// src/placements/placements.controller.ts

import { Request, Response } from "express";
import {
  createPlacementService,
  getAllPlacementsService,
  getPlacementByIdService,
  updatePlacementService,
  deletePlacementService,
  getUserPlacementsService,
} from "./placements.service";

/* =============================
   CREATE A NEW PLACEMENT
============================= */
export const createPlacementController = async (req: Request, res: Response) => {
  try {
    const { userID, programmeID, placementStatus, placementDate } = req.body;

    if (!userID || !programmeID) {
      return res.status(400).json({
        message: "User ID and programme ID are required.",
      });
    }

    const newPlacement = await createPlacementService({
      userID,
      programmeID,
      placementStatus,
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
   GET ALL PLACEMENTS
============================= */
export const getAllPlacementsController = async (
  _req: Request,
  res: Response
) => {
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
export const getPlacementByIdController = async (
  req: Request,
  res: Response
) => {
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
export const updatePlacementController = async (
  req: Request,
  res: Response
) => {
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
export const deletePlacementController = async (
  req: Request,
  res: Response
) => {
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
export const getUserPlacementsController = async (
  req: Request,
  res: Response
) => {
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
