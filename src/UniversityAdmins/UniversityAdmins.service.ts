import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { UniversityAdminsTable } from "../Drizzle/schema";

/* =============================
   CREATE A NEW UNIVERSITY ADMIN
============================ */
export const createUniversityAdminService = async (universityAdmin: any) => {
  const [newUniversityAdmin] = await db
    .insert(UniversityAdminsTable)
    .values(universityAdmin)
    .returning();
  return newUniversityAdmin;
};

/* =============================
   GET ALL UNIVERSITY ADMINS
============================ */
export const getAllUniversityAdminsService = async () => {
  return await db.query.UniversityAdminsTable.findMany({
    with: {
      university: true,
    },
  });
};

/* =============================
   GET UNIVERSITY ADMIN BY ID
============================ */
export const getUniversityAdminByIdService = async (id: number) => {
  return await db.query.UniversityAdminsTable.findFirst({
    where: eq(UniversityAdminsTable.uniAdminID, id),
    with: {
      university: true,
    },
  });
};

/* =============================
   UPDATE UNIVERSITY ADMIN BY ID
============================ */
export const updateUniversityAdminService = async (
  id: number,
  data: Partial<any>
) => {
  await db.update(UniversityAdminsTable)
    .set(data)
    .where(eq(UniversityAdminsTable.uniAdminID, id));
  return "University admin updated successfully";
};

/* =============================
   DELETE UNIVERSITY ADMIN BY ID
============================ */
export const deleteUniversityAdminService = async (id: number) => {
  await db.delete(UniversityAdminsTable)
    .where(eq(UniversityAdminsTable.uniAdminID, id));
  return "University admin deleted successfully";
};

/* =============================
   GET ALL UNIVERSITY ADMINS FOR A UNIVERSITY
============================ */
export const getUniversityAdminsByUniversityService = async (universityID: number) => {
  return await db.query.UniversityAdminsTable.findMany({
    where: eq(UniversityAdminsTable.universityID, universityID),
    with: {
      university: true,
    },
  });
};
