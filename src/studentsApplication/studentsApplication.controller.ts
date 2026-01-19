// src/applications/applications.controller.ts

import { Request, Response } from "express";
import {
  createApplicationService,
  getAllApplicationsService,
  getApplicationByIdService,
  updateApplicationService,
  deleteApplicationService,
  getStudentApplicationsService,
} from "./studentsApplication.service";

// ✅ Create a new student application
export const createApplicationController = async (req: Request, res: Response) => {
  try {
    const application = req.body;

    if (!application.studentID || !application.programmeID || !application.choiceOrder || !application.applicationDate) {
      return res.status(400).json({ message: "Student ID, programme ID, choice order, and application date are required." });
    }

    const createdApplication = await createApplicationService(application);

    return res.status(201).json({
      message: "Application created successfully",
      data: createdApplication,
    });
  } catch (error: any) {
    console.error("Error in createApplicationController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all student applications
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
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid application ID." });

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
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid application ID." });

    const updates = req.body;
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
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid application ID." });

    const result = await deleteApplicationService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteApplicationController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all applications for a specific student
export const getStudentApplicationsController = async (req: Request, res: Response) => {
  try {
    const studentID = parseInt(req.params.studentID as string);
    if (isNaN(studentID)) return res.status(400).json({ message: "Invalid student ID." });

    const applications = await getStudentApplicationsService(studentID);
    return res.status(200).json({ data: applications });
  } catch (error: any) {
    console.error("Error in getStudentApplicationsController:", error);
    return res.status(500).json({ error: error.message });
  }
};
