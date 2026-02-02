// src/placements/placement.service.ts

import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import {
  PlacementsTable,
  UniversityProgrammesTable,
  UniversitiesTable,
  ProgrammesTable,
} from "../Drizzle/schema";

/* =============================
   CREATE A NEW PLACEMENT
============================= */
export const createPlacementService = async (placement: {
  userID: number;
  programmeID: number;
  placementStatus?: string;
  placementDate?: string;
}) => {
  const [newPlacement] = await db
    .insert(PlacementsTable)
    .values(placement)
    .returning();

  return newPlacement;
};

/* =============================
   GET ALL PLACEMENTS
============================= */
export const getAllPlacementsService = async () => {
  return await db.query.PlacementsTable.findMany({
    with: {
      student: true, // resolves to UsersTable
      programme: {
        with: {
          universityProgrammes: {
            with: {
              university: true,
            },
          },
        },
      },
    },
  });
};

/* =============================
   GET PLACEMENT BY ID
============================= */
export const getPlacementByIdService = async (id: number) => {
  return await db.query.PlacementsTable.findFirst({
    where: eq(PlacementsTable.placementID, id),
    with: {
      student: true,
      programme: {
        with: {
          universityProgrammes: {
            with: {
              university: true,
            },
          },
        },
      },
    },
  });
};

/* =============================
   UPDATE PLACEMENT BY ID
============================= */
export const updatePlacementService = async (
  id: number,
  data: Partial<{
    programmeID: number;
    placementStatus: string;
    placementDate: string;
  }>
) => {
  await db
    .update(PlacementsTable)
    .set(data)
    .where(eq(PlacementsTable.placementID, id));

  return "Placement updated successfully";
};

/* =============================
   DELETE PLACEMENT BY ID
============================= */
export const deletePlacementService = async (id: number) => {
  await db
    .delete(PlacementsTable)
    .where(eq(PlacementsTable.placementID, id));

  return "Placement deleted successfully";
};

/* =============================
   GET ALL PLACEMENTS FOR A USER
============================= */
export const getUserPlacementsService = async (userID: number) => {
  const placements = await db.query.PlacementsTable.findMany({
    where: eq(PlacementsTable.userID, userID),
    with: {
      student: true,
      programme: {
        with: {
          universityProgrammes: {
            with: {
              university: true,
            },
          },
        },
      },
    },
  });

  // Flatten to make frontend access easier
  return placements.map((placement) => ({
    ...placement,
    university:
      placement.programme.universityProgrammes?.[0]?.university || null,
  }));
};
