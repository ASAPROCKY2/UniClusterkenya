// src/kcseresults/kcseresults.controller.ts

import { Request, Response } from "express";
import {
  createKcseResultService,
  getAllKcseResultsService,
  getKcseResultByIdService,
  updateKcseResultService,
  deleteKcseResultService,
  getStudentKcseResultsService,
} from "./KcseResults.service";

// ✅ Create a new KCSE result
export const createKcseResultController = async (req: Request, res: Response) => {
  try {
    const kcseResult = req.body;

    if (!kcseResult.studentID || !kcseResult.subjectCode || !kcseResult.grade || !kcseResult.points) {
      return res.status(400).json({ message: "Student ID, subject code, grade, and points are required." });
    }

    const createdResult = await createKcseResultService(kcseResult);

    return res.status(201).json({
      message: "KCSE result created successfully",
      data: createdResult,
    });
  } catch (error: any) {
    console.error("Error in createKcseResultController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all KCSE results
export const getAllKcseResultsController = async (_req: Request, res: Response) => {
  try {
    const results = await getAllKcseResultsService();
    return res.status(200).json({ data: results });
  } catch (error: any) {
    console.error("Error in getAllKcseResultsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get KCSE result by ID
export const getKcseResultByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid KCSE result ID." });

    const result = await getKcseResultByIdService(id);
    if (!result) return res.status(404).json({ message: "KCSE result not found." });

    return res.status(200).json({ data: result });
  } catch (error: any) {
    console.error("Error in getKcseResultByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update KCSE result by ID
export const updateKcseResultController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid KCSE result ID." });

    const updates = req.body;
    const result = await updateKcseResultService(id, updates);

    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updateKcseResultController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete KCSE result by ID
export const deleteKcseResultController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid KCSE result ID." });

    const result = await deleteKcseResultService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteKcseResultController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all KCSE results for a specific student
export const getStudentKcseResultsController = async (req: Request, res: Response) => {
  try {
    const studentID = parseInt(req.params.studentID as string);
    if (isNaN(studentID)) return res.status(400).json({ message: "Invalid student ID." });

    const results = await getStudentKcseResultsService(studentID);
    return res.status(200).json({ data: results });
  } catch (error: any) {
    console.error("Error in getStudentKcseResultsController:", error);
    return res.status(500).json({ error: error.message });
  }
};
