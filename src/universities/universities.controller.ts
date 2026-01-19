// src/universities/university.controller.ts

import { Request, Response } from "express";
import {
  createUniversityService,
  getAllUniversitiesService,
  getUniversityByIdService,
  updateUniversityService,
  deleteUniversityService,
  getUniversityWithProgrammesService,
} from "./universities.service";

// ✅ Create a new university
export const createUniversityController = async (req: Request, res: Response) => {
  try {
    const university = req.body;

    if (!university.name || !university.type) {
      return res.status(400).json({ message: "University name and type are required." });
    }

    const createdUniversity = await createUniversityService(university);

    return res.status(201).json({
      message: "University created successfully",
      data: createdUniversity,
    });
  } catch (error: any) {
    console.error("Error in createUniversityController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all universities
export const getAllUniversitiesController = async (_req: Request, res: Response) => {
  try {
    const universities = await getAllUniversitiesService();
    return res.status(200).json({ data: universities });
  } catch (error: any) {
    console.error("Error in getAllUniversitiesController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get university by ID
export const getUniversityByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid university ID." });

    const university = await getUniversityByIdService(id);
    if (!university) return res.status(404).json({ message: "University not found." });

    return res.status(200).json({ data: university });
  } catch (error: any) {
    console.error("Error in getUniversityByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update university by ID
export const updateUniversityController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid university ID." });

    const updates = req.body;
    const result = await updateUniversityService(id, updates);

    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updateUniversityController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete university by ID
export const deleteUniversityController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid university ID." });

    const result = await deleteUniversityService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteUniversityController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get university with programmes and admins
export const getUniversityWithProgrammesController = async (req: Request, res: Response) => {
  try {
    const universityID = parseInt(req.params.id as string);
    if (isNaN(universityID)) return res.status(400).json({ message: "Invalid university ID." });

    const university = await getUniversityWithProgrammesService(universityID);
    if (!university) return res.status(404).json({ message: "University not found." });

    return res.status(200).json({ data: university });
  } catch (error: any) {
    console.error("Error in getUniversityWithProgrammesController:", error);
    return res.status(500).json({ error: error.message });
  }
};
