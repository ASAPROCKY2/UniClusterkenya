import { Request, Response } from "express";
import {
  createSystemAdminService,
  getAllSystemAdminsService,
  getSystemAdminByIdService,
  updateSystemAdminService,
  deleteSystemAdminService,
} from "./systemAdmins.service";

// ✅ Create a new system admin
export const createSystemAdminController = async (req: Request, res: Response) => {
  try {
    const admin = req.body;

    // Add validation as needed
    if (!admin.email || !admin.password) {
      return res.status(400).json({ 
        message: "Email and password are required." 
      });
    }

    const newAdmin = await createSystemAdminService(admin);

    return res.status(201).json({
      message: "System admin created successfully",
      data: newAdmin,
    });
  } catch (error: any) {
    console.error("Error in createSystemAdminController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all system admins
export const getAllSystemAdminsController = async (_req: Request, res: Response) => {
  try {
    const admins = await getAllSystemAdminsService();
    return res.status(200).json({ data: admins });
  } catch (error: any) {
    console.error("Error in getAllSystemAdminsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get system admin by ID
export const getSystemAdminByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid admin ID." });
    }

    const admin = await getSystemAdminByIdService(id);
    if (!admin) {
      return res.status(404).json({ message: "System admin not found." });
    }

    return res.status(200).json({ data: admin });
  } catch (error: any) {
    console.error("Error in getSystemAdminByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update system admin by ID
export const updateSystemAdminController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid admin ID." });
    }

    const updates = req.body;
    const result = await updateSystemAdminService(id, updates);

    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in updateSystemAdminController:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete system admin by ID
export const deleteSystemAdminController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid admin ID." });
    }

    const result = await deleteSystemAdminService(id);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Error in deleteSystemAdminController:", error);
    return res.status(500).json({ error: error.message });
  }
};