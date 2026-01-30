import { Request, Response } from "express";
import {
  createKcseResultsService,
  getAllKcseResultsService,
  getKcseResultsByUserIdService,
  updateKcseResultsByUserIdService,
  deleteKcseResultsByUserIdService,
  getStudentKcseResultsService,
} from "./KcseResults.service";

/* =============================
   CREATE KCSE RESULTS (BULK)
============================ */
export const createKcseResultController = async (req: Request, res: Response) => {
  try {
    const { userID, results } = req.body;

    if (!userID || !Array.isArray(results) || results.length === 0) {
      return res.status(400).json({
        message: "Student ID and results array are required.",
      });
    }

    for (const r of results) {
      if (
        !r.subjectCode ||
        !r.subjectName ||
        !r.grade ||
        r.points === undefined
      ) {
        return res.status(400).json({
          message:
            "Each result must include subject code, subject name, grade, and points.",
        });
      }
    }

    const createdResults = await createKcseResultsService({
      userID,
      results,
    });

    return res.status(201).json({
      message: "KCSE results created successfully",
      data: createdResults,
    });
  } catch (error: any) {
    console.error("Error in createKcseResultController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ALL KCSE RESULTS
============================ */
export const getAllKcseResultsController = async (_req: Request, res: Response) => {
  try {
    const results = await getAllKcseResultsService();
    return res.status(200).json({ data: results });
  } catch (error: any) {
    console.error("Error in getAllKcseResultsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET KCSE RESULTS BY USER ID
============================ */
export const getKcseResultsByUserIdController = async (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.userID);
    if (isNaN(userID)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const results = await getKcseResultsByUserIdService(userID);
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "KCSE results not found." });
    }

    return res.status(200).json({ data: results });
  } catch (error: any) {
    console.error("Error in getKcseResultsByUserIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   UPDATE KCSE RESULTS BY USER ID
============================ */
export const updateKcseResultsByUserIdController = async (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.userID);
    if (isNaN(userID)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const updates = req.body;
    const result = await updateKcseResultsByUserIdService(userID, updates);

    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updateKcseResultsByUserIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   DELETE KCSE RESULTS BY USER ID
============================ */
export const deleteKcseResultsByUserIdController = async (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.userID);
    if (isNaN(userID)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const result = await deleteKcseResultsByUserIdService(userID);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteKcseResultsByUserIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ALL KCSE RESULTS FOR A STUDENT
============================ */
export const getStudentKcseResultsController = async (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.userID);
    if (isNaN(userID)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const results = await getStudentKcseResultsService(userID);
    return res.status(200).json({ data: results });
  } catch (error: any) {
    console.error("Error in getStudentKcseResultsController:", error);
    return res.status(500).json({ error: error.message });
  }
};
