import { eq, and, type SQL } from "drizzle-orm";
import db from "../Drizzle/db";
import {
  ProgrammesTable,
  UniversityProgrammesTable,
  ProgrammeLevelsTable,
  ProgrammeClustersTable,
  ProgrammeClusterMapTable,
  ProgrammeClusterSubjectsTable,
  ApplicationsTable,
  PlacementsTable,
} from "../Drizzle/schema";

/* =============================
   CREATE PROGRAMME (FIXED)
============================= */
export const createProgrammeService = async ({
  programme,
  universityID,
  clusterIDs,
}: {
  programme: any;
  universityID: number;
  clusterIDs?: number[];
}) => {
  /* 1️⃣ CREATE PROGRAMME */
  const [created] = await db
    .insert(ProgrammesTable)
    .values(programme)
    .returning();

  /* 2️⃣ LINK PROGRAMME TO UNIVERSITY (🔥 BUG FIXED HERE) */
  await db.insert(UniversityProgrammesTable).values({
    programmeID: created.programmeID,
    universityID,
    capacity: programme.capacity ?? 0,     // ✅ REQUIRED
    filledSlots: 0,                         // ✅ SAFE DEFAULT
    durationYears: programme.durationYears ?? null,
    minAGP: programme.minAGP ?? null,
    helbEligible: programme.helbEligible ?? false,
    scholarshipAvailable: programme.scholarshipAvailable ?? false,
  });

  /* 3️⃣ MAP PROGRAMME TO CLUSTERS */
  if (clusterIDs?.length) {
    await db.insert(ProgrammeClusterMapTable).values(
      [...new Set(clusterIDs)].map((clusterID) => ({
        programmeID: created.programmeID,
        clusterID,
      }))
    );
  }

  return created;
};

/* =============================
   GET ALL PROGRAMMES
============================= */
export const getAllProgrammesService = async () => {
  const rows = await db
    .select({
      programmeID: ProgrammesTable.programmeID,
      programmeName: ProgrammesTable.name,
      programmeLevel: ProgrammesTable.level,
      durationYears: UniversityProgrammesTable.durationYears,
      minAGP: UniversityProgrammesTable.minAGP,
      helbEligible: UniversityProgrammesTable.helbEligible,
      scholarshipAvailable: UniversityProgrammesTable.scholarshipAvailable,
      clusterID: ProgrammeClustersTable.clusterID,
      clusterCode: ProgrammeClustersTable.clusterCode,
      clusterName: ProgrammeClustersTable.name,
    })
    .from(ProgrammesTable)
    .leftJoin(
      UniversityProgrammesTable,
      eq(ProgrammesTable.programmeID, UniversityProgrammesTable.programmeID)
    )
    .leftJoin(
      ProgrammeClusterMapTable,
      eq(ProgrammesTable.programmeID, ProgrammeClusterMapTable.programmeID)
    )
    .leftJoin(
      ProgrammeClustersTable,
      eq(ProgrammeClusterMapTable.clusterID, ProgrammeClustersTable.clusterID)
    );

  const programmesMap: Record<number, any> = {};

  for (const r of rows) {
    if (!programmesMap[r.programmeID]) {
      programmesMap[r.programmeID] = {
        programmeID: r.programmeID,
        name: r.programmeName,
        level: r.programmeLevel,
        durationYears: r.durationYears ? Number(r.durationYears) : null,
        minAGP: r.minAGP ?? null,
        helbEligible: !!r.helbEligible,
        scholarshipAvailable: !!r.scholarshipAvailable,
        clusters: [],
      };
    }

    if (r.clusterID) {
      const exists = programmesMap[r.programmeID].clusters.some(
        (c: any) => c.clusterID === r.clusterID
      );

      if (!exists) {
        programmesMap[r.programmeID].clusters.push({
          clusterID: r.clusterID,
          clusterCode: r.clusterCode,
          name: r.clusterName,
        });
      }
    }
  }

  return Object.values(programmesMap);
};

/* =============================
   GET PROGRAMME BY ID
============================= */
export const getProgrammeByIdService = async (programmeID: number) => {
  const rows = await db
    .select({
      programmeID: ProgrammesTable.programmeID,
      programmeName: ProgrammesTable.name,
      programmeLevel: ProgrammesTable.level,
      durationYears: UniversityProgrammesTable.durationYears,
      minAGP: UniversityProgrammesTable.minAGP,
      helbEligible: UniversityProgrammesTable.helbEligible,
      scholarshipAvailable: UniversityProgrammesTable.scholarshipAvailable,
      clusterID: ProgrammeClustersTable.clusterID,
      clusterCode: ProgrammeClustersTable.clusterCode,
      clusterName: ProgrammeClustersTable.name,
    })
    .from(ProgrammesTable)
    .leftJoin(
      UniversityProgrammesTable,
      eq(ProgrammesTable.programmeID, UniversityProgrammesTable.programmeID)
    )
    .leftJoin(
      ProgrammeClusterMapTable,
      eq(ProgrammesTable.programmeID, ProgrammeClusterMapTable.programmeID)
    )
    .leftJoin(
      ProgrammeClustersTable,
      eq(ProgrammeClusterMapTable.clusterID, ProgrammeClustersTable.clusterID)
    )
    .where(eq(ProgrammesTable.programmeID, programmeID));

  if (!rows.length) return null;

  const clusterMap: Record<number, any> = {};

  for (const r of rows) {
    if (!r.clusterID) continue;

    if (!clusterMap[r.clusterID]) {
      const subjects = await db
        .select({
          id: ProgrammeClusterSubjectsTable.id,
          subjectCode: ProgrammeClusterSubjectsTable.subjectCode,
          subjectName: ProgrammeClusterSubjectsTable.subjectName,
          minPoints: ProgrammeClusterSubjectsTable.minPoints,
          alternativeGroup:
            ProgrammeClusterSubjectsTable.alternativeGroup,
        })
        .from(ProgrammeClusterSubjectsTable)
        .where(
          eq(
            ProgrammeClusterSubjectsTable.clusterID,
            r.clusterID
          )
        );

      clusterMap[r.clusterID] = {
        clusterID: r.clusterID,
        clusterCode: r.clusterCode,
        name: r.clusterName,
        subjects,
      };
    }
  }

  return {
    programmeID: rows[0].programmeID,
    name: rows[0].programmeName,
    level: rows[0].programmeLevel,
    durationYears: rows[0].durationYears
      ? Number(rows[0].durationYears)
      : null,
    minAGP: rows[0].minAGP ?? null,
    helbEligible: !!rows[0].helbEligible,
    scholarshipAvailable: !!rows[0].scholarshipAvailable,
    clusters: Object.values(clusterMap),
  };
};

/* =============================
   UPDATE PROGRAMME
============================= */
export const updateProgrammeService = async (
  programmeID: number,
  updates: any
) =>
  db
    .update(ProgrammesTable)
    .set(updates)
    .where(eq(ProgrammesTable.programmeID, programmeID));

/* =============================
   DELETE PROGRAMME
============================= */
export const deleteProgrammeService = async (programmeID: number) =>
  db.delete(ProgrammesTable).where(eq(ProgrammesTable.programmeID, programmeID));

/* =============================
   PROGRAMME LEVELS
============================= */
export const getProgrammeLevelsService = async () =>
  db.select().from(ProgrammeLevelsTable);

/* =============================
   PROGRAMME CLUSTERS
============================= */
export const getProgrammeClustersService = async () =>
  db.select().from(ProgrammeClustersTable);

/* =============================
   PROGRAMMES BY LEVEL
============================= */
export const getProgrammesByLevelService = async (level: string) =>
  db.select().from(ProgrammesTable).where(eq(ProgrammesTable.level, level));

/* =============================
   PROGRAMMES BY CLUSTER
============================= */
export const getProgrammesByClusterService = async (clusterID: number) =>
  db
    .select({
      programmeID: ProgrammesTable.programmeID,
      programmeName: ProgrammesTable.name,
      programmeLevel: ProgrammesTable.level,
    })
    .from(ProgrammeClusterMapTable)
    .where(eq(ProgrammeClusterMapTable.clusterID, clusterID))
    .leftJoin(
      ProgrammesTable,
      eq(ProgrammeClusterMapTable.programmeID, ProgrammesTable.programmeID)
    );

/* =============================
   FILTER PROGRAMMES
============================= */
export const filterProgrammesService = async (filters: { level?: string }) => {
  const conditions: SQL[] = [];
  if (filters.level) {
    conditions.push(eq(ProgrammesTable.level, filters.level));
  }

  return db
    .select()
    .from(ProgrammesTable)
    .where(conditions.length ? and(...conditions) : undefined);
};

/* =============================
   APPLICATIONS
============================= */
export const getApplicationsForProgrammeService = async (programmeID: number) =>
  db
    .select()
    .from(ApplicationsTable)
    .where(eq(ApplicationsTable.programmeID, programmeID));

/* =============================
   PLACEMENTS
============================= */
export const getPlacementsForProgrammeService = async (programmeID: number) =>
  db
    .select()
    .from(PlacementsTable)
    .where(eq(PlacementsTable.programmeID, programmeID));
