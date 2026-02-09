import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  createUserService,
  getUserByEmailService,
  verifyUserService,
  userLoginService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../user/user.service";

//
// 🧩 Create a new user
//
export const createUserController = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      kcseIndex,
      agp,
      meanGrade,
      photoURL,
      gender,
      highSchool,
      phoneNumber,     // ✅ FIXED
      citizenship,     // ✅ FIXED
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const trimmedEmail = email.trim();

    // Check if user exists
    const existingUser = await getUserByEmailService(trimmedEmail);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Prepare user object (matches Drizzle schema)
    const newUser = {
      firstName: firstName?.trim() || "",
      lastName: lastName?.trim() || "",
      email: trimmedEmail,
      passwordHash: password,
      role: role || "student",

      phoneNumber: phoneNumber?.trim() || null,   // ✅ FIXED
      citizenship: citizenship?.trim() || null,   // ✅ FIXED

      kcseIndex: kcseIndex?.trim() || null,
      agp: agp || null,
      meanGrade: meanGrade || null,
      photoURL: photoURL || null,
      gender: gender || null,
      highSchool: highSchool || null,
    };

    await createUserService(newUser);

    return res.status(201).json({
      message: "User created successfully. Verification code sent to email.",
    });
  } catch (error: any) {
    console.error("❌ Error in createUserController:", error);
    return res.status(500).json({ error: error.message });
  }
};

//
// 🧩 Verify user
//
export const verifyUserController = async (req: Request, res: Response) => {
  try {
    const email = req.body?.email?.trim();
    const verificationCode = req.body?.verificationCode?.trim();

    if (!email || !verificationCode) {
      return res.status(400).json({
        error: "Email and verification code are required.",
      });
    }

    await verifyUserService(email, verificationCode);

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error: any) {
    console.error("❌ Error in verifyUserController:", error);
    return res.status(500).json({ error: error.message });
  }
};

//
// 🧩 Login user
//
export const userLoginController = async (req: Request, res: Response) => {
  try {
    const email = req.body?.email?.trim();
    const kcseIndex = req.body?.kcseIndex?.trim();
    const password = req.body?.password;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    const userData = await userLoginService({
      email,
      kcseIndex: kcseIndex || "",
      password,
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not defined.");

    const token = jwt.sign(
      {
        userID: userData.userID,
        email: userData.email,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        kcseIndex: userData.kcseIndex,
        photoURL: userData.photoURL,
        gender: userData.gender,
        highSchool: userData.highSchool,
      },
      secret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error: any) {
    console.error("❌ Error in userLoginController:", error);
    return res.status(500).json({ error: error.message });
  }
};

//
// 🧩 Get all users
//
export const getUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    return res.status(200).json({ data: users });
  } catch (error: any) {
    console.error("❌ Error in getUsersController:", error);
    return res.status(500).json({ error: error.message });
  }
};

//
// 🧩 Get user by ID
//
export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ data: user });
  } catch (error: any) {
    console.error("❌ Error in getUserByIdController:", error);
    return res.status(500).json({ error: error.message });
  }
};

//
// 🧩 Update user
//
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updates: any = { ...req.body };

    if (updates.password) {
      updates.passwordHash = await bcrypt.hash(updates.password, 10);
      delete updates.password;
    }

    await updateUserService(id, updates);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error: any) {
    console.error("❌ Error in updateUserController:", error);
    return res.status(500).json({ error: error.message });
  }
};

//
// 🧩 Delete user
//
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    await deleteUserService(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error(" Error in deleteUserController:", error);
    return res.status(500).json({ error: error.message });
  }
};
