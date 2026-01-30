// src/applications/applications.controller.ts
import { Request, Response } from "express";
import {
  createApplicationService,
  getAllApplicationsService,
  getApplicationByIdService,
  updateApplicationService,
  deleteApplicationService,
  getUserApplicationsService,
} from "./studentsApplication.service";

//  Helper to safely parse IDs from req.params
const parseID = (value: string | string[] | undefined): number | null => {
  if (!value) return null;
  const str = Array.isArray(value) ? value[0] : value; // take first element if array
  const id = parseInt(str, 10);
  return isNaN(id) ? null : id;
};

//  Create a new application
export const createApplicationController = async (req: Request, res: Response) => {
  try {
    const { userID, studentID, programmeID, choiceOrder, applicationDate, status, clusterScore } = req.body;

    const finalUserID = userID || studentID;

    // Validate required fields
    if (!finalUserID || !programmeID || !choiceOrder || !applicationDate) {
      return res.status(400).json({
        message: "User ID, programme ID, choice order, and application date are required.",
      });
    }

    // Validate applicationDate format
    const parsedDate = new Date(applicationDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid applicationDate format." });
    }

    // Pass applicationDate as string (YYYY-MM-DD) to service
    const applicationData = {
      userID: finalUserID,
      programmeID,
      choiceOrder,
      applicationDate: parsedDate.toISOString().split("T")[0], // format to "YYYY-MM-DD"
      status: status || "Pending",
      clusterScore: clusterScore || null,
    };

    const createdApplication = await createApplicationService(applicationData);

    return res.status(201).json({
      message: "Application created successfully",
      data: createdApplication,
    });
  } catch (error: any) {
    console.error("Error in createApplicationController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all applications
export const getAllApplicationsController = async (_req: Request, res: Response) => {
  try {
    const applications = await getAllApplicationsService();
    return res.status(200).json({ data: applications });
  } catch (error: any) {
    console.error("Error in getAllApplicationsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get application by ID
export const getApplicationByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseID(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid application ID." });

    const application = await getApplicationByIdService(id);
    if (!application) return res.status(404).json({ message: "Application not found." });

    return res.status(200).json({ data: application });
  } catch (error: any) {
    console.error("Error in getApplicationByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update application by ID
export const updateApplicationController = async (req: Request, res: Response) => {
  try {
    const id = parseID(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid application ID." });

    const updates = { ...req.body };

    // If updating applicationDate, validate and convert to string
    if (updates.applicationDate) {
      const parsedDate = new Date(updates.applicationDate);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: "Invalid applicationDate format." });
      }
      updates.applicationDate = parsedDate.toISOString().split("T")[0]; // format to "YYYY-MM-DD"
    }

    const result = await updateApplicationService(id, updates);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updateApplicationController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete application by ID
export const deleteApplicationController = async (req: Request, res: Response) => {
  try {
    const id = parseID(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid application ID." });

    const result = await deleteApplicationService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteApplicationController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all applications for a specific user
export const getUserApplicationsController = async (req: Request, res: Response) => {
  try {
    const userID = parseID(req.params.userID);
    if (!userID) return res.status(400).json({ message: "Invalid user ID." });

    const applications = await getUserApplicationsService(userID);
    return res.status(200).json({ data: applications });
  } catch (error: any) {
    console.error("Error in getUserApplicationsController:", error);
    return res.status(500).json({ error: error.message });
  }
};
