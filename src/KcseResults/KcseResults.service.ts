// src/kcseresults/kcseresults.service.ts
import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { KcseResultsTable } from "../Drizzle/schema";

/* =============================
   CREATE NEW KCSE RESULTS (ONE OR MANY)
============================ */
export const createKcseResultsService = async (payload: {
  userID: number;
  results: {
    subjectCode: string;
    subjectName: string;
    grade: string;
    points: number;
  }[];
}) => {
  const { userID, results } = payload;

  const rows = results.map((r) => ({
    userID,
    subjectCode: r.subjectCode,
    subjectName: r.subjectName,
    grade: r.grade,
    points: r.points,
  }));

  const newResults = await db.insert(KcseResultsTable).values(rows).returning();

  return newResults;
};

/* =============================
   GET ALL KCSE RESULTS (WITH STUDENT INFO)
============================ */
export const getAllKcseResultsService = async () => {
  return await db.query.KcseResultsTable.findMany({
    with: {
      student: true, // <-- include full student details
    },
  });
};

/* =============================
   GET KCSE RESULTS BY USER ID (WITH STUDENT INFO)
============================ */
export const getKcseResultsByUserIdService = async (userID: number) => {
  return await db.query.KcseResultsTable.findMany({
    where: eq(KcseResultsTable.userID, userID),
    with: {
      student: true, // <-- include full student details
    },
  });
};

/* =============================
   UPDATE KCSE RESULTS BY USER ID
============================ */
export const updateKcseResultsByUserIdService = async (
  userID: number,
  data: Partial<{
    subjectCode: string;
    subjectName: string;
    grade: string;
    points: number;
  }>
) => {
  await db.update(KcseResultsTable)
    .set(data)
    .where(eq(KcseResultsTable.userID, userID));

  return "KCSE result updated successfully";
};

/* =============================
   DELETE KCSE RESULTS BY USER ID
============================ */
export const deleteKcseResultsByUserIdService = async (userID: number) => {
  await db.delete(KcseResultsTable)
    .where(eq(KcseResultsTable.userID, userID));

  return "KCSE result deleted successfully";
};

/* =============================
   GET ALL RESULTS FOR A STUDENT (WITH STUDENT INFO)
============================ */
export const getStudentKcseResultsService = async (userID: number) => {
  return await db.query.KcseResultsTable.findMany({
    where: eq(KcseResultsTable.userID, userID),
    with: {
      student: true, // <-- include full student details
    },
  });
};
