import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { SystemAdminsTable } from "../Drizzle/schema";

/* =============================
   CREATE A NEW SYSTEM ADMIN
============================= */
export const createSystemAdminService = async (admin: any) => {
  const [newAdmin] = await db
    .insert(SystemAdminsTable)
    .values(admin)
    .returning();
  return newAdmin;
};

/* =============================
   GET ALL SYSTEM ADMINS
============================= */
export const getAllSystemAdminsService = async () => {
  return await db.query.SystemAdminsTable.findMany();
};

/* =============================
   GET SYSTEM ADMIN BY ID
============================= */
export const getSystemAdminByIdService = async (id: number) => {
  return await db.query.SystemAdminsTable.findFirst({
    where: eq(SystemAdminsTable.adminID, id),
  });
};

/* =============================
   UPDATE SYSTEM ADMIN BY ID
============================= */
export const updateSystemAdminService = async (id: number, data: Partial<any>) => {
  await db.update(SystemAdminsTable)
    .set(data)
    .where(eq(SystemAdminsTable.adminID, id));
  return "System admin updated successfully";
};

/* =============================
   DELETE SYSTEM ADMIN BY ID
============================= */
export const deleteSystemAdminService = async (id: number) => {
  await db.delete(SystemAdminsTable)
    .where(eq(SystemAdminsTable.adminID, id));
  return "System admin deleted successfully";
};
