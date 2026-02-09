// src/applications/applications.service.ts
import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import {
  ApplicationsTable,
  ProgrammeClusterMapTable,
  ProgrammeClustersTable,
} from "../Drizzle/schema";
import type { TIApplication } from "../Drizzle/schema";

/* =============================
   CREATE A NEW STUDENT APPLICATION
   - Automatically assigns clusterID based on programmeID
============================= */
export const createApplicationService = async (application: TIApplication) => {
  // Fetch clusterID from ProgrammeClusterMapTable
  const clusterMap = await db.query.ProgrammeClusterMapTable.findFirst({
    where: eq(ProgrammeClusterMapTable.programmeID, application.programmeID),
  });

  if (!clusterMap) {
    throw new Error("No cluster found for the selected programme.");
  }

  application.clusterID = clusterMap.clusterID;

  const [newApplication] = await db
    .insert(ApplicationsTable)
    .values(application)
    .returning();

  return newApplication;
};

/* =============================
   GET ALL STUDENT APPLICATIONS
   - Includes student, programme, and cluster info
============================= */
export const getAllApplicationsService = async () => {
  return await db.query.ApplicationsTable.findMany({
    with: {
      student: true,
      programme: true,
      cluster: true,
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
      cluster: true,
    },
  });
};

/* =============================
   UPDATE APPLICATION BY ID
============================= */
export const updateApplicationService = async (
  id: number,
  data: Partial<TIApplication>
) => {
  // Optional: if programmeID is updated, automatically update clusterID
  if (data.programmeID) {
    const clusterMap = await db.query.ProgrammeClusterMapTable.findFirst({
      where: eq(ProgrammeClusterMapTable.programmeID, data.programmeID),
    });
    if (!clusterMap) {
      throw new Error("No cluster found for the selected programme.");
    }
    data.clusterID = clusterMap.clusterID;
  }

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
   GET ALL APPLICATIONS FOR A USER
============================= */
export const getUserApplicationsService = async (userID: number) => {
  return await db.query.ApplicationsTable.findMany({
    where: eq(ApplicationsTable.userID, userID),
    with: {
      student: true,
      programme: true,
      cluster: true,
    },
  });
};
