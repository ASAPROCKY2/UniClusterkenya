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
      phoneNumber,
      gender,
      citizenship,
      highSchool,
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

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Prepare user object
    const newUser = {
      firstName: firstName?.trim() || "",
      lastName: lastName?.trim() || "",
      email: trimmedEmail,
      passwordHash,
      role: role || "student",
      kcseIndex: kcseIndex?.trim() || null,
      agp: agp || null,
      meanGrade: meanGrade || null,
      photoURL: photoURL || null,
      phoneNumber: phoneNumber?.trim() || null,
      gender: gender?.trim() || null,
      citizenship: citizenship?.trim() || null,
      highSchool: highSchool?.trim() || null,
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
      return res.status(400).json({ error: "Email and verification code are required." });
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
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Validate user login
    const userData = await userLoginService({ email, kcseIndex: kcseIndex || "", password });

    // Generate JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not defined in environment.");

    const token = jwt.sign(
      {
        userID: userData.userID,
        email: userData.email,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        kcseIndex: userData.kcseIndex,
        image_url: userData.image_url,
      },
      secret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token, user: userData });
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
    if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });

    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

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
    if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });

    const updates: any = { ...req.body };

    // If password is being updated, hash it
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
    if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });

    await deleteUserService(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error in deleteUserController:", error);
    return res.status(500).json({ error: error.message });
  }
};
