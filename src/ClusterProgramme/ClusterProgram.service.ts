// src/programmes/clusterProgramme.service.ts
import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { ProgrammeClusterSubjectsTable } from "../Drizzle/schema";

/* =============================
   CREATE CLUSTER SUBJECT(S)
============================= */
export const createClusterSubjectsService = async ({
  clusterID,
  subjects,
}: {
  clusterID: number;
  subjects: {
    subjectCode: string;
    subjectName: string;
    minPoints: number;
    alternativeGroup?: number;
  }[];
}) => {
  const rows = subjects.map((s) => ({
    clusterID,
    subjectCode: s.subjectCode,
    subjectName: s.subjectName,
    minPoints: s.minPoints,
    alternativeGroup: s.alternativeGroup ?? null,
  }));

  const newSubjects = await db
    .insert(ProgrammeClusterSubjectsTable)
    .values(rows)
    .returning();

  return newSubjects;
};


export const getClusterSubjectsByClusterService = async (clusterID: number) => {
  return await db.query.ProgrammeClusterSubjectsTable.findMany({
    where: eq(ProgrammeClusterSubjectsTable.clusterID, clusterID),
  });
};

/* =============================
   GET SINGLE CLUSTER SUBJECT
============================= */
export const getClusterSubjectByIdService = async (id: number) => {
  const [subject] = await db.query.ProgrammeClusterSubjectsTable.findMany({
    where: eq(ProgrammeClusterSubjectsTable.id, id),
  });
  return subject;
};

/* =============================
   UPDATE CLUSTER SUBJECT
============================= */
export const updateClusterSubjectService = async (
  id: number,
  updates: Partial<{
    subjectCode: string;
    subjectName: string;
    minPoints: number;
    alternativeGroup?: number;
  }>
) => {
  await db
    .update(ProgrammeClusterSubjectsTable)
    .set(updates)
    .where(eq(ProgrammeClusterSubjectsTable.id, id));

  return "Cluster subject updated successfully";
};

/* =============================
   DELETE CLUSTER SUBJECT
============================= */
export const deleteClusterSubjectService = async (id: number) => {
  await db
    .delete(ProgrammeClusterSubjectsTable)
    .where(eq(ProgrammeClusterSubjectsTable.id, id));

  return "Cluster subject deleted successfully";
};
