import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import {
  ApplicationsTable,
  ProgrammeClusterMapTable,
} from "../Drizzle/schema";
import type { TIApplication } from "../Drizzle/schema";

/* =============================
   STATUS TYPE (FROM SCHEMA)
============================= */
type DbApplicationStatus = TIApplication["status"];

/* =============================
   NORMALIZE STATUS SAFELY
   (ONLY VALUES ALLOWED BY DB)
============================= */
const normalizeStatus = (
  status?: string | null
): DbApplicationStatus => {
  const value = status?.toLowerCase();

  switch (value) {
    case "pending":
    case "placed":
    case "not_placed":
    case "withdrawn":
    case "rejected":
      return value;
    default:
      return "pending";
  }
};

/* =============================
   CREATE A NEW STUDENT APPLICATION
============================= */
export const createApplicationService = async (
  application: TIApplication
) => {
  const clusterMap =
    await db.query.ProgrammeClusterMapTable.findFirst({
      where: eq(
        ProgrammeClusterMapTable.programmeID,
        application.programmeID
      ),
    });

  if (!clusterMap) {
    throw new Error(
      "No cluster found for the selected programme."
    );
  }

  const safeApplication: TIApplication = {
    ...application,
    clusterID: clusterMap.clusterID,
    status: normalizeStatus(application.status),
  };

  const [newApplication] = await db
    .insert(ApplicationsTable)
    .values(safeApplication)
    .returning();

  return newApplication;
};

/* =============================
   HELPER: MAP FIRST UNIVERSITY
============================= */
const mapFirstUniversity = (application: any) => {
  const firstUniversity =
    application.programme?.universityProgrammes?.[0]
      ?.university ?? null;

  return {
    ...application,
    programme: {
      ...application.programme,
      university: firstUniversity,
    },
  };
};

/* =============================
   GET ALL APPLICATIONS
============================= */
export const getAllApplicationsService = async () => {
  const applications =
    await db.query.ApplicationsTable.findMany({
      with: {
        student: true,
        cluster: true,
        programme: {
          with: {
            universityProgrammes: {
              with: { university: true },
            },
          },
        },
      },
    });

  return applications.map(mapFirstUniversity);
};

/* =============================
   GET APPLICATION BY ID
============================= */
export const getApplicationByIdService = async (
  id: number
) => {
  const application =
    await db.query.ApplicationsTable.findFirst({
      where: eq(
        ApplicationsTable.applicationID,
        id
      ),
      with: {
        student: true,
        cluster: true,
        programme: {
          with: {
            universityProgrammes: {
              with: { university: true },
            },
          },
        },
      },
    });

  if (!application) return null;
  return mapFirstUniversity(application);
};

/* =============================
   UPDATE APPLICATION BY ID
============================= */
export const updateApplicationService = async (
  id: number,
  data: Partial<TIApplication>
) => {
  if (data.programmeID) {
    const clusterMap =
      await db.query.ProgrammeClusterMapTable.findFirst({
        where: eq(
          ProgrammeClusterMapTable.programmeID,
          data.programmeID
        ),
      });

    if (!clusterMap) {
      throw new Error(
        "No cluster found for the selected programme."
      );
    }

    data.clusterID = clusterMap.clusterID;
  }

  if (data.status) {
    data.status = normalizeStatus(data.status);
  }

  await db
    .update(ApplicationsTable)
    .set(data)
    .where(
      eq(
        ApplicationsTable.applicationID,
        id
      )
    );

  return "Application updated successfully";
};

/* =============================
   DELETE APPLICATION BY ID
============================= */
export const deleteApplicationService = async (
  id: number
) => {
  await db
    .delete(ApplicationsTable)
    .where(
      eq(
        ApplicationsTable.applicationID,
        id
      )
    );

  return "Application deleted successfully";
};

/* =============================
   GET USER APPLICATIONS
============================= */
export const getUserApplicationsService = async (
  userID: number
) => {
  const applications =
    await db.query.ApplicationsTable.findMany({
      where: eq(
        ApplicationsTable.userID,
        userID
      ),
      with: {
        student: true,
        cluster: true,
        programme: {
          with: {
            universityProgrammes: {
              with: { university: true },
            },
          },
        },
      },
    });

  return applications.map(mapFirstUniversity);
};
