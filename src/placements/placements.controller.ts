import { Request, Response } from "express";
import {
  createPlacementService,
  getAllPlacementsService,
  getPlacementByIdService,
  updatePlacementService,
  deletePlacementService,
  getStudentPlacementsService,
} from "./placements.service";

// ✅ Create a new placement
export const createPlacementController = async (req: Request, res: Response) => {
  try {
    const placement = req.body;

    if (!placement.studentID || !placement.programmeID) {
      return res.status(400).json({ message: "Student ID and programme ID are required." });
    }

    const newPlacement = await createPlacementService(placement);

    return res.status(201).json({
      message: "Placement created successfully",
      data: newPlacement,
    });
  } catch (error: any) {
    console.error("Error in createPlacementController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all placements
export const getAllPlacementsController = async (_req: Request, res: Response) => {
  try {
    const placements = await getAllPlacementsService();
    return res.status(200).json({ data: placements });
  } catch (error: any) {
    console.error("Error in getAllPlacementsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get placement by ID
export const getPlacementByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid placement ID." });

    const placement = await getPlacementByIdService(id);
    if (!placement) return res.status(404).json({ message: "Placement not found." });

    return res.status(200).json({ data: placement });
  } catch (error: any) {
    console.error("Error in getPlacementByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update placement by ID
export const updatePlacementController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid placement ID." });

    const updates = req.body;
    const result = await updatePlacementService(id, updates);

    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updatePlacementController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete placement by ID
export const deletePlacementController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid placement ID." });

    const result = await deletePlacementService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deletePlacementController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all placements for a specific student
export const getStudentPlacementsController = async (req: Request, res: Response) => {
  try {
    const studentID = parseInt(req.params.studentID as string);
    if (isNaN(studentID)) return res.status(400).json({ message: "Invalid student ID." });

    const placements = await getStudentPlacementsService(studentID);
    return res.status(200).json({ data: placements });
  } catch (error: any) {
    console.error("Error in getStudentPlacementsController:", error);
    return res.status(500).json({ error: error.message });
  }
};
