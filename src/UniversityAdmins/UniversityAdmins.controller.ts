import { Request, Response } from "express";
import {
  createUniversityAdminService,
  getAllUniversityAdminsService,
  getUniversityAdminByIdService,
  updateUniversityAdminService,
  deleteUniversityAdminService,
  getUniversityAdminsByUniversityService,
} from "./UniversityAdmins.service";

// ✅ Create a new university admin
export const createUniversityAdminController = async (req: Request, res: Response) => {
  try {
    const universityAdmin = req.body;

    if (!universityAdmin.universityID || !universityAdmin.email || !universityAdmin.passwordHash) {
      return res.status(400).json({ message: "University ID, email and password are required." });
    }

    const newUniversityAdmin = await createUniversityAdminService(universityAdmin);

    return res.status(201).json({
      message: "University admin created successfully",
      data: newUniversityAdmin,
    });
  } catch (error: any) {
    console.error("Error in createUniversityAdminController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all university admins
export const getAllUniversityAdminsController = async (_req: Request, res: Response) => {
  try {
    const admins = await getAllUniversityAdminsService();
    return res.status(200).json({ data: admins });
  } catch (error: any) {
    console.error("Error in getAllUniversityAdminsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get university admin by ID
export const getUniversityAdminByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid university admin ID." });

    const admin = await getUniversityAdminByIdService(id);
    if (!admin) return res.status(404).json({ message: "University admin not found." });

    return res.status(200).json({ data: admin });
  } catch (error: any) {
    console.error("Error in getUniversityAdminByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update university admin by ID
export const updateUniversityAdminController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid university admin ID." });

    const updates = req.body;
    const result = await updateUniversityAdminService(id, updates);

    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updateUniversityAdminController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete university admin by ID
export const deleteUniversityAdminController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid university admin ID." });

    const result = await deleteUniversityAdminService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteUniversityAdminController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all university admins for a specific university
export const getUniversityAdminsByUniversityController = async (req: Request, res: Response) => {
  try {
    const universityID = parseInt(req.params.universityID as string);
    if (isNaN(universityID)) return res.status(400).json({ message: "Invalid university ID." });

    const admins = await getUniversityAdminsByUniversityService(universityID);
    return res.status(200).json({ data: admins });
  } catch (error: any) {
    console.error("Error in getUniversityAdminsByUniversityController:", error);
    return res.status(500).json({ error: error.message });
  }
};
