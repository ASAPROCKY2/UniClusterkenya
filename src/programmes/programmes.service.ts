// src/programmes/programmes.service.ts
import { eq, and, type SQL } from "drizzle-orm";
import db from "../Drizzle/db";
import {
  ProgrammesTable,
  ProgrammeLevelsTable,
  ProgrammeClustersTable,
  ProgrammeClusterMapTable,
  ApplicationsTable,
  PlacementsTable,
  UniversitiesTable,
} from "../Drizzle/schema";

/* =============================
   CREATE PROGRAMME
============================= */
export const createProgrammeService = async ({
  programme,
  clusterIDs,
}: {
  programme: any;
  clusterIDs?: number[];
}) => {
  const [created] = await db
    .insert(ProgrammesTable)
    .values({
      ...programme,
      durationYears: programme.durationYears?.toString(),
    })
    .returning();

  if (clusterIDs?.length) {
    await db.insert(ProgrammeClusterMapTable).values(
      clusterIDs.map((clusterID) => ({
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
  return db
    .select({
      programmeID: ProgrammesTable.programmeID,
      programmeName: ProgrammesTable.name,
      programmeLevel: ProgrammesTable.level,
      clusterID: ProgrammeClustersTable.clusterID,
      clusterCode: ProgrammeClustersTable.clusterCode,
      clusterName: ProgrammeClustersTable.name,
    })
    .from(ProgrammesTable)
    .leftJoin(
      ProgrammeClusterMapTable,
      eq(ProgrammesTable.programmeID, ProgrammeClusterMapTable.programmeID)
    )
    .leftJoin(
      ProgrammeClustersTable,
      eq(ProgrammeClusterMapTable.clusterID, ProgrammeClustersTable.clusterID)
    );
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
      clusterID: ProgrammeClustersTable.clusterID,
      clusterCode: ProgrammeClustersTable.clusterCode,
      clusterName: ProgrammeClustersTable.name,
    })
    .from(ProgrammesTable)
    .leftJoin(
      ProgrammeClusterMapTable,
      eq(ProgrammesTable.programmeID, ProgrammeClusterMapTable.programmeID)
    )
    .leftJoin(
      ProgrammeClustersTable,
      eq(ProgrammeClusterMapTable.clusterID, ProgrammeClustersTable.clusterID)
    );

  return rows[0];
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
    .set({
      ...updates,
      durationYears: updates.durationYears?.toString(),
    })
    .where(eq(ProgrammesTable.programmeID, programmeID));

/* =============================
   DELETE PROGRAMME
============================= */
export const deleteProgrammeService = async (programmeID: number) =>
  db
    .delete(ProgrammesTable)
    .where(eq(ProgrammesTable.programmeID, programmeID));

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
export const filterProgrammesService = async (filters: {
  level?: string;
}) => {
  const conditions: SQL[] = [];

  if (filters.level) conditions.push(eq(ProgrammesTable.level, filters.level));

  return db
    .select()
    .from(ProgrammesTable)
    .where(conditions.length ? and(...conditions) : undefined);
};

/* =============================
   APPLICATIONS
============================= */
export const getApplicationsForProgrammeService = async (
  programmeID: number
) =>
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
