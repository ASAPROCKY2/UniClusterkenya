// src/applications/applications.service.ts

import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { ApplicationsTable } from "../Drizzle/schema";

/* =============================
   CREATE A NEW STUDENT APPLICATION
============================= */
export const createApplicationService = async (application: any) => {
  const [newApplication] = await db
    .insert(ApplicationsTable)
    .values(application)
    .returning();
  return newApplication;
};

/* =============================
   GET ALL STUDENT APPLICATIONS
============================= */
export const getAllApplicationsService = async () => {
  return await db.query.ApplicationsTable.findMany({
    with: {
      student: true,   // include related student info
      programme: true, // include related programme info
    },
  });
};

/* =============================
   GET APPLICATION BY ID
============================= */
export const getApplicationByIdService = async (id: number) => {
  return await db.query.ApplicationsTable.findFirst({
    where: eq(ApplicationsTable.applicationID, id),
    with: {
      student: true,
      programme: true,
    },
  });
};

/* =============================
   UPDATE APPLICATION BY ID
============================= */
export const updateApplicationService = async (id: number, data: Partial<any>) => {
  await db.update(ApplicationsTable)
    .set(data)
    .where(eq(ApplicationsTable.applicationID, id));
  return "Application updated successfully";
};

/* =============================
   DELETE APPLICATION BY ID
============================= */
export const deleteApplicationService = async (id: number) => {
  await db.delete(ApplicationsTable)
    .where(eq(ApplicationsTable.applicationID, id));
  return "Application deleted successfully";
};

/* =============================
   GET ALL APPLICATIONS FOR A STUDENT
============================= */
export const getStudentApplicationsService = async (studentID: number) => {
  return await db.query.ApplicationsTable.findMany({
    where: eq(ApplicationsTable.studentID, studentID),
    with: {
      student: true,
      programme: true,
    },
  });
};
