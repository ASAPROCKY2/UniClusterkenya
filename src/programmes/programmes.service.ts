// src/programmes/programme.service.ts

import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { ProgrammesTable } from "../Drizzle/schema";

/* =============================
   CREATE A NEW PROGRAMME
============================= */
export const createProgrammeService = async (programme: any) => {
  const [newProgramme] = await db
    .insert(ProgrammesTable)
    .values(programme)
    .returning();
  return newProgramme;
};

/* =============================
   GET ALL PROGRAMMES
============================= */
export const getAllProgrammesService = async () => {
  return await db.query.ProgrammesTable.findMany({
    with: {
      university: true, // include university info
      applications: true, // include applications
      placements: true,   // include placements
    },
  });
};

/* =============================
   GET PROGRAMME BY ID
============================= */
export const getProgrammeByIdService = async (id: number) => {
  return await db.query.ProgrammesTable.findFirst({
    where: eq(ProgrammesTable.programmeID, id),
    with: {
      university: true,
      applications: true,
      placements: true,
    },
  });
};

/* =============================
   UPDATE PROGRAMME BY ID
============================= */
export const updateProgrammeService = async (id: number, data: Partial<any>) => {
  await db.update(ProgrammesTable)
    .set(data)
    .where(eq(ProgrammesTable.programmeID, id));
  return "Programme updated successfully";
};

/* =============================
   DELETE PROGRAMME BY ID
============================= */
export const deleteProgrammeService = async (id: number) => {
  await db.delete(ProgrammesTable)
    .where(eq(ProgrammesTable.programmeID, id));
  return "Programme deleted successfully";
};

/* =============================
   GET PROGRAMME WITH APPLICATIONS AND PLACEMENTS
============================= */
export const getProgrammeWithApplicationsService = async (programmeID: number) => {
  return await db.query.ProgrammesTable.findFirst({
    where: eq(ProgrammesTable.programmeID, programmeID),
    with: {
      applications: true, // students who applied
      placements: true,   // students placed
      university: true,   // university info
    },
  });
};
