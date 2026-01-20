import { Request, Response } from "express";
import {
  createStudentService,
  getStudentByEmailService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
  getStudentFullProfileService,
  getStudentByUserIdService,
} from "./students.service";

/* =============================
   STUDENT INPUT TYPE (DTO)
============================ */
interface StudentInput {
  userID?: number;          // Optional (if student linked to user)
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  gender: string;
  citizenship: string;
  highSchool: string;
  kcseIndex: string;
  meanGrade: string;
  agp: number;
  photoURL?: string;
}

/* =============================
   CREATE STUDENT
============================ */
export const createStudentController = async (req: Request, res: Response) => {
  try {
    const student = req.body as Partial<StudentInput>;

    /* =============================
       REQUIRED FIELD VALIDATION
    ============================= */
    const requiredFields: (keyof StudentInput)[] = [
      "firstName",
      "lastName",
      "email",
      "gender",
      "citizenship",
      "highSchool",
      "kcseIndex",
      "meanGrade",
      "agp",
    ];

    for (const field of requiredFields) {
      if (!student[field]) {
        return res.status(400).json({ message: `${field} is required.` });
      }
    }

    /* =============================
       EMAIL TYPE GUARD (BUG FIX)
    ============================= */
    if (typeof student.email !== "string") {
      return res.status(400).json({ message: "Invalid email format." });
    }

    /* =============================
       CHECK DUPLICATE EMAIL
    ============================= */
    const existingStudent = await getStudentByEmailService(student.email);
    if (existingStudent) {
      return res
        .status(409)
        .json({ message: "Student with this email already exists." });
    }

    /* =============================
       CREATE STUDENT
    ============================= */
    const newStudent = await createStudentService(student as StudentInput);

    return res.status(201).json({
      message: "Student created successfully",
      data: newStudent,
    });
  } catch (error: any) {
    console.error("❌ Error in createStudentController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ALL STUDENTS
============================ */
export const getAllStudentsController = async (_req: Request, res: Response) => {
  try {
    const students = await getAllStudentsService();
    return res.status(200).json({ data: students });
  } catch (error: any) {
    console.error("❌ Error in getAllStudentsController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET STUDENT BY ID
============================ */
export const getStudentByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const student = await getStudentByIdService(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.status(200).json({ data: student });
  } catch (error: any) {
    console.error("❌ Error in getStudentByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET STUDENT BY USER ID
============================ */
export const getStudentByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const userID = Number(req.params.userID);
    if (!Number.isInteger(userID)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const student = await getStudentByUserIdService(userID);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.status(200).json({ data: student });
  } catch (error: any) {
    console.error("❌ Error in getStudentByUserIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   UPDATE STUDENT
============================ */
export const updateStudentController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    await updateStudentService(id, req.body);
    return res.status(200).json({ message: "Student updated successfully" });
  } catch (error: any) {
    console.error("❌ Error in updateStudentController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   DELETE STUDENT
============================ */
export const deleteStudentController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    await deleteStudentService(id);
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error in deleteStudentController:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET FULL STUDENT PROFILE
============================ */
export const getStudentFullProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    const studentID = Number(req.params.id);
    if (!Number.isInteger(studentID)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const student = await getStudentFullProfileService(studentID);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.status(200).json({ data: student });
  } catch (error: any) {
    console.error("❌ Error in getStudentFullProfileController:", error);
    return res.status(500).json({ error: error.message });
  }
};
