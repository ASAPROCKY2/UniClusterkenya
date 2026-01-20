// src/universities/university.service.ts

import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { UniversitiesTable } from "../Drizzle/schema";

/* =============================
   CREATE A NEW UNIVERSITY
============================= */
export const createUniversityService = async (university: any) => {
  const [newUniversity] = await db
    .insert(UniversitiesTable)
    .values(university)
    .returning();
  return newUniversity;
};

/* =============================
   GET ALL UNIVERSITIES
============================= */
export const getAllUniversitiesService = async () => {
  return await db.query.UniversitiesTable.findMany({
    with: {
      programmes: true,       // include related programmes
    },
  });
};

/* =============================
   GET UNIVERSITY BY ID
============================= */
export const getUniversityByIdService = async (id: number) => {
  return await db.query.UniversitiesTable.findFirst({
    where: eq(UniversitiesTable.universityID, id),
    with: {
      programmes: true,
    },
  });
};

/* =============================
   UPDATE UNIVERSITY BY ID
============================= */
export const updateUniversityService = async (id: number, data: Partial<any>) => {
  await db.update(UniversitiesTable)
    .set(data)
    .where(eq(UniversitiesTable.universityID, id));
  return "University updated successfully";
};

/* =============================
   DELETE UNIVERSITY BY ID
============================= */
export const deleteUniversityService = async (id: number) => {
  await db.delete(UniversitiesTable)
    .where(eq(UniversitiesTable.universityID, id));
  return "University deleted successfully";
};

/* =============================
   GET UNIVERSITY WITH PROGRAMMES AND ADMINS
============================= */
export const getUniversityWithProgrammesService = async (universityID: number) => {
  return await db.query.UniversitiesTable.findFirst({
    where: eq(UniversitiesTable.universityID, universityID),
    with: {
      programmes: true,       // all programmes offered by this university
    },
  });
};
