// src/universities/university.controller.ts

import { Request, Response } from "express";
import {
  createUniversityService,
  getAllUniversitiesService,
  getUniversityByIdService,
  updateUniversityService,
  deleteUniversityService,
  getUniversityWithProgrammesService,
  getUniversitiesByProgrammeService,
} from "./universities.service";
import { TIUniversity, TSUniversity } from "../Drizzle/schema";

/* =============================
   CREATE A NEW UNIVERSITY
============================= */
export const createUniversityController = async (req: Request, res: Response) => {
  try {
    const university: TIUniversity = req.body;

    if (!university.name || !university.type) {
      return res.status(400).json({ message: "University name and type are required." });
    }

    const createdUniversity: TSUniversity = await createUniversityService(university);

    return res.status(201).json({
      message: "University created successfully",
      data: createdUniversity,
    });
  } catch (error: any) {
    console.error("Error in createUniversityController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ALL UNIVERSITIES
============================= */
export const getAllUniversitiesController = async (_req: Request, res: Response) => {
  try {
    const universities: TSUniversity[] = await getAllUniversitiesService();
    return res.status(200).json({ data: universities });
  } catch (error: any) {
    console.error("Error in getAllUniversitiesController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET UNIVERSITY BY ID
============================= */
export const getUniversityByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid university ID." });

    const university: TSUniversity | null = await getUniversityByIdService(id);
    if (!university) return res.status(404).json({ message: "University not found." });

    return res.status(200).json({ data: university });
  } catch (error: any) {
    console.error("Error in getUniversityByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   UPDATE UNIVERSITY BY ID
============================= */
export const updateUniversityController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid university ID." });

    const updates: Partial<TIUniversity> = req.body;
    const result = await updateUniversityService(id, updates);

    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updateUniversityController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   DELETE UNIVERSITY BY ID
============================= */
export const deleteUniversityController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid university ID." });

    const result = await deleteUniversityService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteUniversityController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET UNIVERSITY WITH PROGRAMMES
============================= */
export const getUniversityWithProgrammesController = async (req: Request, res: Response) => {
  try {
    const universityID = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    if (isNaN(universityID)) return res.status(400).json({ message: "Invalid university ID." });

    const university = await getUniversityWithProgrammesService(universityID);
    if (!university) return res.status(404).json({ message: "University not found." });

    // Map to response with programmes
    const response = {
      universityID: university.universityID,
      name: university.name,
      type: university.type,
      county: university.county,
      logoURL: university.logoURL,
      governmentScholarship: university.governmentScholarship,
      helbEligible: university.helbEligible,
      programmes: university.universityProgrammes?.map(up => up.programme) || [],
    };

    return res.status(200).json({ data: response });
  } catch (error: any) {
    console.error("Error in getUniversityWithProgrammesController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET UNIVERSITIES OFFERING A SPECIFIC PROGRAMME
============================= */
export const getUniversitiesByProgrammeController = async (req: Request, res: Response) => {
  try {
    const programmeID = parseInt(
      Array.isArray(req.params.programmeID) ? req.params.programmeID[0] : req.params.programmeID
    );
    if (isNaN(programmeID)) return res.status(400).json({ message: "Invalid programme ID." });

    const universities: TSUniversity[] = await getUniversitiesByProgrammeService(programmeID);

    return res.status(200).json({ data: universities });
  } catch (error: any) {
    console.error("Error in getUniversitiesByProgrammeController:", error);
    return res.status(500).json({ error: error.message });
  }
};
