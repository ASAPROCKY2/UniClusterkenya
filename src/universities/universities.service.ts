// src/universities/university.service.ts

import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import {
  UniversitiesTable,
  UniversityProgrammesTable,
  TIUniversity,
  TSUniversity,
} from "../Drizzle/schema";

/* =============================
   CREATE A NEW UNIVERSITY
============================= */
export const createUniversityService = async (university: TIUniversity): Promise<TSUniversity> => {
  const [newUniversity] = await db
    .insert(UniversitiesTable)
    .values(university)
    .returning();
  return newUniversity;
};

/* =============================
   GET ALL UNIVERSITIES
   (include programmes info)
============================= */
export const getAllUniversitiesService = async (): Promise<TSUniversity[]> => {
  const universities = await db.query.UniversitiesTable.findMany({
    with: {
      universityProgrammes: {
        with: {
          programme: true,
        },
      },
    },
  });

  // Map to plain TSUniversity
  return universities.map(u => ({
    universityID: u.universityID,
    name: u.name,
    type: u.type,
    county: u.county,
    logoURL: u.logoURL,
    governmentScholarship: u.governmentScholarship,
    helbEligible: u.helbEligible,
  }));
};

/* =============================
   GET UNIVERSITY BY ID
============================= */
export const getUniversityByIdService = async (id: number): Promise<TSUniversity | null> => {
  const university = await db.query.UniversitiesTable.findFirst({
    where: eq(UniversitiesTable.universityID, id),
    with: {
      universityProgrammes: {
        with: {
          programme: true,
        },
      },
    },
  });

  if (!university) return null;

  return {
    universityID: university.universityID,
    name: university.name,
    type: university.type,
    county: university.county,
    logoURL: university.logoURL,
    governmentScholarship: university.governmentScholarship,
    helbEligible: university.helbEligible,
  };
};

/* =============================
   UPDATE UNIVERSITY BY ID
============================= */
export const updateUniversityService = async (
  id: number,
  data: Partial<TIUniversity>
) => {
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
   GET UNIVERSITY WITH PROGRAMMES
============================= */
export const getUniversityWithProgrammesService = async (universityID: number) => {
  return await db.query.UniversitiesTable.findFirst({
    where: eq(UniversitiesTable.universityID, universityID),
    with: {
      universityProgrammes: {
        with: {
          programme: true,
        },
      },
    },
  });
};

/* =============================
   GET UNIVERSITIES OFFERING A SPECIFIC PROGRAMME
============================= */
export const getUniversitiesByProgrammeService = async (
  programmeID: number
): Promise<TSUniversity[]> => {
  // Select only university columns explicitly
  const results = await db
    .select({
      universityID: UniversitiesTable.universityID,
      name: UniversitiesTable.name,
      type: UniversitiesTable.type,
      county: UniversitiesTable.county,
      logoURL: UniversitiesTable.logoURL,
      governmentScholarship: UniversitiesTable.governmentScholarship,
      helbEligible: UniversitiesTable.helbEligible,
    })
    .from(UniversitiesTable)
    .innerJoin(
      UniversityProgrammesTable,
      eq(UniversityProgrammesTable.universityID, UniversitiesTable.universityID)
    )
    .where(eq(UniversityProgrammesTable.programmeID, programmeID));

  // results already match TSUniversity type
  return results;
};
