import { Express } from "express";
import {
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
  getStudentFullProfileController,
  getStudentByUserIdController,
} from "./students.controller";

/* =============================
   STUDENT ROUTES
============================ */
const StudentsRoutes = (app: Express) => {

  // Create student
  app.post("/students", async (req, res, next) => {
    try {
      await createStudentController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Get all students
  app.get("/students", async (req, res, next) => {
    try {
      await getAllStudentsController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Get student by ID
  app.get("/students/:id", async (req, res, next) => {
    try {
      await getStudentByIdController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Get student by USER ID
  app.get("/students/user/:userID", async (req, res, next) => {
    try {
      await getStudentByUserIdController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Update student
  app.put("/students/:id", async (req, res, next) => {
    try {
      await updateStudentController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Delete student
  app.delete("/students/:id", async (req, res, next) => {
    try {
      await deleteStudentController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Get full student profile
  app.get("/students/:id/profile", async (req, res, next) => {
    try {
      await getStudentFullProfileController(req, res);
    } catch (error) {
      next(error);
    }
  });
};

export default StudentsRoutes;
