import { eq, sql } from "drizzle-orm";
import db from "../Drizzle/db";
import bcrypt from "bcryptjs";
import { UsersTable, TIUser } from "../Drizzle/schema";
import { sendEmail } from "../mailer/mailer";

//
// 🧩 Create a new user (with verification code)
//
export const createUserService = async (user: TIUser) => {
  // Hash password before storing
  const hashedPassword = await bcrypt.hash(user.passwordHash, 10);

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await db.insert(UsersTable).values({
    ...user,
    passwordHash: hashedPassword,
    role: user.role || "student",
    isVerified: false,
    verificationCode,
    verificationCodeExpiresAt,
  });

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
    where: sql`${UsersTable.email} = ${email.trim()}`,
  });
};

//
// 🧩 Verify a user using verification code
//
export const verifyUserService = async (email: string, code: string) => {
  const trimmedEmail = email.trim();
  const trimmedCode = code.trim();

  const user = await getUserByEmailService(trimmedEmail);
  if (!user) throw new Error("User not found");

  const now = new Date();
  if (!user.verificationCode || !user.verificationCodeExpiresAt)
    throw new Error("No verification code found");
  if (user.verificationCodeExpiresAt < now)
    throw new Error("Verification code expired");

  if (user.verificationCode.trim() !== trimmedCode)
    throw new Error("Invalid verification code");

  await db.update(UsersTable)
    .set({ isVerified: true, verificationCode: null, verificationCodeExpiresAt: null })
    .where(sql`${UsersTable.email} = ${trimmedEmail}`);

  return "User verified successfully";
};

//
// 🧩 Login a user (email + KCSE index + password)
//
export const userLoginService = async (data: {
  email: string;
  kcseIndex: string;
  password: string;
}) => {
  const trimmedEmail = data.email.trim();
  const trimmedKCSE = data.kcseIndex.trim();
  const password = data.password;

  // 1️⃣ Find user by email
  const user = await db.query.UsersTable.findFirst({
    where: sql`${UsersTable.email} = ${trimmedEmail}`,
  });

  if (!user) throw new Error("User not found");
  if (!user.isVerified) throw new Error("User is not verified. Please verify your email first.");

  // 2️⃣ Check KCSE index (only for students)
  if (user.role === "student") {
    if (!user.kcseIndex || user.kcseIndex !== trimmedKCSE)
      throw new Error("Invalid KCSE index");
  }

  // 3️⃣ Validate password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new Error("Incorrect password");

  // 4️⃣ Return relevant info
  return {
    userID: user.userID,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    kcseIndex: user.kcseIndex,
    agp: user.agp,
    meanGrade: user.meanGrade,
    image_url: user.photoURL,
  };
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
export const updateUserService = async (id: number, updates: Partial<TIUser>) => {
  // If password is being updated, hash it
  if (updates.passwordHash) {
    updates.passwordHash = await bcrypt.hash(updates.passwordHash, 10);
  }

  const allowedUpdates = { ...updates, updatedAt: new Date() };
  await db.update(UsersTable).set(allowedUpdates).where(eq(UsersTable.userID, id));
  return "User updated successfully";
};

//
// 🧩 Delete a user by ID
//
export const deleteUserService = async (id: number) => {
  await db.delete(UsersTable).where(eq(UsersTable.userID, id));
  return "User deleted successfully";
};
