import { Express } from "express";
import {
  createUserController,
  verifyUserController,
  userLoginController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getUserWithStudentController,
} from "./user.controller";

//
// 🧭 User Routes for UniCluster
//
const UserRoutes = (app: Express) => {
  //
  // 🔐 AUTH ROUTES
  //
  // Register a new user
  app.route("/auth/register").post(async (req, res, next) => {
    try {
      await createUserController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Login user
  app.route("/auth/login").post(async (req, res, next) => {
    try {
      await userLoginController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Verify user (email verification)
  app.route("/auth/verify").post(async (req, res, next) => {
    try {
      await verifyUserController(req, res);
    } catch (error) {
      next(error);
    }
  });

  //
  // 👥 USER MANAGEMENT
  //
  // Get all users
  app.route("/users").get(async (req, res, next) => {
    try {
      await getUsersController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Get user by ID
  app.route("/users/:id").get(async (req, res, next) => {
    try {
      await getUserByIdController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Update user
  app.route("/users/:id").put(async (req, res, next) => {
    try {
      await updateUserController(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Delete user
  app.route("/users/:id").delete(async (req, res, next) => {
    try {
      await deleteUserController(req, res);
    } catch (error) {
      next(error);
    }
  });

  //
  // 👨‍🎓 USER RELATIONS
  //
  // Get user with student profile
  app.route("/users/:id/student").get(async (req, res, next) => {
    try {
      await getUserWithStudentController(req, res);
    } catch (error) {
      next(error);
    }
  });
};

export default UserRoutes;
