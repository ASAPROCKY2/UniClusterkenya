// src/programmes/programme.controller.ts
import { Request, Response } from "express";
import {
  createProgrammeService,
  getAllProgrammesService,
  getProgrammeByIdService,
  updateProgrammeService,
  deleteProgrammeService,
  getProgrammeWithApplicationsService,
} from "./programmes.service";

// ✅ Create a new programme
export const createProgrammeController = async (req: Request, res: Response) => {
  try {
    const programme = req.body;

    if (!programme.universityID || !programme.name) {
      return res.status(400).json({ message: "University ID and programme name are required." });
    }

    const createdProgramme = await createProgrammeService(programme);

    return res.status(201).json({
      message: "Programme created successfully",
      data: createdProgramme,
    });
  } catch (error: any) {
    console.error("Error in createProgrammeController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all programmes
export const getAllProgrammesController = async (_req: Request, res: Response) => {
  try {
    const programmes = await getAllProgrammesService();
    return res.status(200).json({ data: programmes });
  } catch (error: any) {
    console.error("Error in getAllProgrammesController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get programme by ID
export const getProgrammeByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string); // ✅ Cast to string
    if (isNaN(id)) return res.status(400).json({ message: "Invalid programme ID." });

    const programme = await getProgrammeByIdService(id);
    if (!programme) return res.status(404).json({ message: "Programme not found." });

    return res.status(200).json({ data: programme });
  } catch (error: any) {
    console.error("Error in getProgrammeByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update programme by ID
export const updateProgrammeController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string); // Cast to string
    if (isNaN(id)) return res.status(400).json({ message: "Invalid programme ID." });

    const updates = req.body;
    const result = await updateProgrammeService(id, updates);

    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updateProgrammeController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete programme by ID
export const deleteProgrammeController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string); // ✅ Cast to string
    if (isNaN(id)) return res.status(400).json({ message: "Invalid programme ID." });

    const result = await deleteProgrammeService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteProgrammeController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get programme with applications and placements
export const getProgrammeWithApplicationsController = async (req: Request, res: Response) => {
  try {
    const programmeID = parseInt(req.params.id as string); // ✅ Cast to string
    if (isNaN(programmeID)) return res.status(400).json({ message: "Invalid programme ID." });

    const programme = await getProgrammeWithApplicationsService(programmeID);
    if (!programme) return res.status(404).json({ message: "Programme not found." });

    return res.status(200).json({ data: programme });
  } catch (error: any) {
    console.error("Error in getProgrammeWithApplicationsController:", error);
    return res.status(500).json({ error: error.message });
  }
};
