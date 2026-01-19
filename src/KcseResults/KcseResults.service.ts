// src/kcseresults/kcseresults.service.ts

import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { KcseResultsTable } from "../Drizzle/schema";

/* =============================
   CREATE A NEW KCSE RESULT
============================= */
export const createKcseResultService = async (kcseResult: any) => {
  const [newResult] = await db
    .insert(KcseResultsTable)
    .values(kcseResult)
    .returning();
  return newResult;
};

/* =============================
   GET ALL KCSE RESULTS
============================= */
export const getAllKcseResultsService = async () => {
  return await db.query.KcseResultsTable.findMany({
    with: {
      student: true, // include related student info
    },
  });
};

/* =============================
   GET KCSE RESULT BY ID
============================= */
export const getKcseResultByIdService = async (id: number) => {
  return await db.query.KcseResultsTable.findFirst({
    where: eq(KcseResultsTable.resultID, id),
    with: {
      student: true,
    },
  });
};

/* =============================
   UPDATE KCSE RESULT BY ID
============================= */
export const updateKcseResultService = async (id: number, data: Partial<any>) => {
  await db.update(KcseResultsTable)
    .set(data)
    .where(eq(KcseResultsTable.resultID, id));
  return "KCSE result updated successfully";
};

/* =============================
   DELETE KCSE RESULT BY ID
============================= */
export const deleteKcseResultService = async (id: number) => {
  await db.delete(KcseResultsTable)
    .where(eq(KcseResultsTable.resultID, id));
  return "KCSE result deleted successfully";
};

/* =============================
   GET ALL RESULTS FOR A STUDENT
============================= */
export const getStudentKcseResultsService = async (studentID: number) => {
  return await db.query.KcseResultsTable.findMany({
    where: eq(KcseResultsTable.studentID, studentID),
    with: {
      student: true, // include student info
    },
  });
};
