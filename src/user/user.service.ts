import { eq, sql } from "drizzle-orm";
import db from "../Drizzle/db";
import {
  UsersTable,
  StudentsTable,
  roleEnum,
  TIUser,
  TSUser,
} from "../Drizzle/schema";
import { sendEmail } from "../mailer/mailer";

//
// 🧩 Create a new user (with verification code)
//
export const createUserService = async (user: TIUser) => {
  // generate verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // expiration time 15 minutes from now
  const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await db.insert(UsersTable).values({
    ...user,
    role: user.role,
    isVerified: false,
    verificationCode,
    verificationCodeExpiresAt,
  });

  // send verification email
  const emailMessage = `Your verification code is ${verificationCode}. It expires in 15 minutes.`;
  const emailHTML = `<p>Your verification code is <b>${verificationCode}</b>.</p>
                     <p>This code expires in 15 minutes.</p>`;

  await sendEmail(user.email, "Verify your UniCluster account", emailMessage, emailHTML);

  return "User created successfully. Verification email sent.";
};

//
// 🧩 Get user by email
//
export const getUserByEmailService = async (email: string) => {
  return await db.query.UsersTable.findFirst({
    where: sql`${UsersTable.email} = ${email.trim()}`, // trim email
  });
};

//
// 🧩 Verify a user using verification code
//
export const verifyUserService = async (email: string, code: string) => {
  const trimmedEmail = email.trim();
  const trimmedCode = code.trim();

  const user = await getUserByEmailService(trimmedEmail);

  if (!user) {
    throw new Error("User not found");
  }

  // check expiration
  const now = new Date();
  if (!user.verificationCode || !user.verificationCodeExpiresAt) {
    throw new Error("No verification code found");
  }

  if (user.verificationCodeExpiresAt < now) {
    throw new Error("Verification code expired");
  }

  // trim stored code to avoid accidental space mismatch
  if (user.verificationCode.trim() !== trimmedCode) {
    console.log("Verification failed:", {
      storedCode: user.verificationCode,
      inputCode: trimmedCode,
    });
    throw new Error("Invalid verification code");
  }

  // set verified true
  await db
    .update(UsersTable)
    .set({ isVerified: true, verificationCode: null, verificationCodeExpiresAt: null })
    .where(sql`${UsersTable.email} = ${trimmedEmail}`);

  return "User verified successfully";
};

//
// 🧩 Login a user
//
export const userLoginService = async (user: TSUser) => {
  const email = user.email.trim();

  const userExist = await db.query.UsersTable.findFirst({
    columns: {
      userID: true,
      email: true,
      passwordHash: true,
      role: true,
      isVerified: true,
    },
    where: sql`${UsersTable.email} = ${email}`,
  });

  if (!userExist) {
    throw new Error("User not found");
  }

  if (!userExist.isVerified) {
    throw new Error("User is not verified. Please verify your email first.");
  }

  return userExist;
};

//
// 🧩 Get all users
//
export const getUsersService = async () => {
  return await db.query.UsersTable.findMany();
};

//
// 🧩 Get a user by ID
//
export const getUserByIdService = async (id: number) => {
  return await db.query.UsersTable.findFirst({
    where: eq(UsersTable.userID, id),
  });
};

//
// 🧩 Update a user by ID
//
export const updateUserService = async (
  id: number,
  updates: Partial<TIUser>
) => {
  const allowedUpdates = { ...updates, updatedAt: new Date() };

  await db
    .update(UsersTable)
    .set(allowedUpdates)
    .where(eq(UsersTable.userID, id));

  return "User updated successfully";
};

//
// 🧩 Delete a user by ID
//
export const deleteUserService = async (id: number) => {
  await db.delete(UsersTable).where(eq(UsersTable.userID, id));
  return "User deleted successfully";
};

//
// 🧩 Get a user with their student profile
//
export const getUserWithStudentService = async (userID: number) => {
  return await db.query.UsersTable.findFirst({
    where: eq(UsersTable.userID, userID),
    with: {
      student: true,
    },
  });
};
