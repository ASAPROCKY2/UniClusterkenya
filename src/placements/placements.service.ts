// src/placements/placement.service.ts
import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import type { TSPlacement, TSApplication } from "../Drizzle/schema";
import {
  PlacementsTable,
  UniversityProgrammesTable,
  ApplicationsTable,
} from "../Drizzle/schema";

/* =============================
   CREATE A NEW PLACEMENT
============================= */
export const createPlacementService = async (placement: {
  userID: number;
  programmeID: number;
  universityID: number;
  applicationID: number;
  year: number;
  placementDate?: Date;
}): Promise<TSPlacement> => {
  const [newPlacement] = await db
    .insert(PlacementsTable)
    .values({
      ...placement,
      placementDate: placement.placementDate ?? new Date(),
    })
    .returning();

  const upRecord = await db.query.UniversityProgrammesTable.findFirst({
    where: eq(UniversityProgrammesTable.id, placement.universityID),
  });

  if (upRecord) {
    await db.update(UniversityProgrammesTable).set({
      filledSlots: (upRecord.filledSlots ?? 0) + 1,
    }).where(eq(UniversityProgrammesTable.id, upRecord.id));
  }

  return newPlacement;
};

/* =============================
   GET ALL PLACEMENTS
============================= */
export const getAllPlacementsService = async (): Promise<TSPlacement[]> => {
  return await db.query.PlacementsTable.findMany({
    with: {
      student: true,
      programme: true,
      university: true,
    },
  });
};

/* =============================
   GET PLACEMENT BY ID
============================= */
export const getPlacementByIdService = async (
  id: number
): Promise<TSPlacement | null> => {
  const placement = await db.query.PlacementsTable.findFirst({
    where: eq(PlacementsTable.placementID, id),
    with: {
      student: true,
      programme: true,
      university: true,
    },
  });

  return placement ?? null;
};

/* =============================
   UPDATE PLACEMENT BY ID
============================= */
export const updatePlacementService = async (
  id: number,
  data: Partial<{
    programmeID: number;
    universityID: number;
    applicationID: number;
    year: number;
    placementDate: Date;
  }>
): Promise<string> => {
  await db.update(PlacementsTable).set(data).where(
    eq(PlacementsTable.placementID, id)
  );
  return "Placement updated successfully";
};

/* =============================
   DELETE PLACEMENT BY ID
============================= */
export const deletePlacementService = async (id: number): Promise<string> => {
  const placement = await db.query.PlacementsTable.findFirst({
    where: eq(PlacementsTable.placementID, id),
  });

  if (placement) {
    const upRecord = await db.query.UniversityProgrammesTable.findFirst({
      where: eq(UniversityProgrammesTable.programmeID, placement.programmeID),
    });

    if (upRecord) {
      await db.update(UniversityProgrammesTable).set({
        filledSlots: (upRecord.filledSlots ?? 0) - 1,
      }).where(eq(UniversityProgrammesTable.id, upRecord.id));
    }
  }

  await db.delete(PlacementsTable).where(
    eq(PlacementsTable.placementID, id)
  );

  return "Placement deleted successfully";
};

/* =============================
   GET ALL PLACEMENTS FOR A USER
============================= */
export const getUserPlacementsService = async (userID: number): Promise<TSPlacement[]> => {
  return await db.query.PlacementsTable.findMany({
    where: eq(PlacementsTable.userID, userID),
    with: {
      student: true,
      programme: true,
      university: true,
    },
  });
};

/* =============================
   AUTO PLACEMENT SERVICE
============================= */
export const autoPlacementService = async (year: number): Promise<TSPlacement[]> => {
  // Fetch pending applications WITH student & KCSE results
  const applications: (TSApplication & { student: { userID: number; kcseResults?: any[] } })[] =
    await db.query.ApplicationsTable.findMany({
      where: eq(ApplicationsTable.status, "pending"),
      with: { student: { with: { kcseResults: true } } },
      orderBy: [ApplicationsTable.clusterScore],
    });

  const placements: TSPlacement[] = [];

  for (const app of applications) {
    const student = app.student;

    const uniProgs = await db.query.UniversityProgrammesTable.findMany({
      where: eq(UniversityProgrammesTable.programmeID, app.programmeID),
    });

    let placed = false;

    for (const up of uniProgs) {
      if ((up.capacity ?? 0) > (up.filledSlots ?? 0)) {
        const placement = await createPlacementService({
          userID: student.userID,
          programmeID: app.programmeID,
          universityID: up.universityID,
          applicationID: app.applicationID,
          year,
        });

        placements.push(placement);

        await db.update(ApplicationsTable).set({
          status: "placed",
        }).where(eq(ApplicationsTable.applicationID, app.applicationID));

        placed = true;
        break;
      }
    }

    if (!placed) {
      await db.update(ApplicationsTable).set({
        status: "not_placed",
      }).where(eq(ApplicationsTable.applicationID, app.applicationID));
    }
  }

  return placements;
};
