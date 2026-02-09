// src/programmes/programmeWindow.service.ts
import { eq, and, type SQL } from "drizzle-orm";
import db from "../Drizzle/db";
import { ApplicationWindowsTable } from "../Drizzle/schema";

/* =============================
   CREATE APPLICATION WINDOW
============================= */
export const createApplicationWindowService = async ({
  name,
  startDate,
  endDate,
  programmeID,
  totalSlots,
}: {
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  programmeID: number;
  totalSlots: number;
}) => {
  const payload: any = {
    name,
    startDate,
    endDate,
    programmeID,
    totalSlots,
    availableSlots: totalSlots, // initially all slots are available
  };

  const created = await db
    .insert(ApplicationWindowsTable)
    .values(payload)
    .returning();

  return created[0];
};

/* =============================
   GET ALL APPLICATION WINDOWS
============================= */
export const getAllApplicationWindowsService = async () => {
  return db.select().from(ApplicationWindowsTable);
};

/* =============================
   GET APPLICATION WINDOW BY ID
============================= */
export const getApplicationWindowByIdService = async (windowID: number) => {
  const rows = await db
    .select()
    .from(ApplicationWindowsTable)
    .where(eq(ApplicationWindowsTable.windowID, windowID));

  return rows[0];
};

/* =============================
   UPDATE APPLICATION WINDOW
============================= */
export const updateApplicationWindowService = async (
  windowID: number,
  updates: Partial<{
    name: string;
    startDate: string | Date;
    endDate: string | Date;
    programmeID: number;
    totalSlots: number;
    availableSlots: number;
    isActive: boolean;
  }>
) => {
  // If totalSlots changes, adjust availableSlots accordingly
  if (updates.totalSlots !== undefined) {
    const window = await getApplicationWindowByIdService(windowID);
    const slotDiff = updates.totalSlots - window.totalSlots;
    updates.availableSlots = window.availableSlots + slotDiff;
  }

  // Convert Date values to string to satisfy Drizzle column types
  const sanitizedUpdates: any = { ...updates };
  if (sanitizedUpdates.startDate instanceof Date) {
    sanitizedUpdates.startDate = sanitizedUpdates.startDate.toISOString();
  }
  if (sanitizedUpdates.endDate instanceof Date) {
    sanitizedUpdates.endDate = sanitizedUpdates.endDate.toISOString();
  }

  return db
    .update(ApplicationWindowsTable)
    .set(sanitizedUpdates)
    .where(eq(ApplicationWindowsTable.windowID, windowID));
};

/* =============================
   DELETE APPLICATION WINDOW
============================= */
export const deleteApplicationWindowService = async (windowID: number) => {
  return db
    .delete(ApplicationWindowsTable)
    .where(eq(ApplicationWindowsTable.windowID, windowID));
};

/* =============================
   GET ACTIVE WINDOWS
============================= */
export const getActiveApplicationWindowsService = async () => {
  return db
    .select()
    .from(ApplicationWindowsTable)
    .where(eq(ApplicationWindowsTable.isActive, true));
};

/* =============================
   FILTER WINDOWS
============================= */
export const filterApplicationWindowsService = async (filters: {
  programmeID?: number;
  isActive?: boolean;
  startDate?: string | Date;
  endDate?: string | Date;
}) => {
  // sanitize Date values to strings for Drizzle comparisons
  const sanitizedFilters: any = { ...filters };
  if (sanitizedFilters.startDate instanceof Date) {
    sanitizedFilters.startDate = sanitizedFilters.startDate.toISOString();
  }
  if (sanitizedFilters.endDate instanceof Date) {
    sanitizedFilters.endDate = sanitizedFilters.endDate.toISOString();
  }

  const conditions: SQL[] = [];

  if (sanitizedFilters.programmeID) conditions.push(eq(ApplicationWindowsTable.programmeID, sanitizedFilters.programmeID));
  if (sanitizedFilters.isActive !== undefined) conditions.push(eq(ApplicationWindowsTable.isActive, sanitizedFilters.isActive));
  if (sanitizedFilters.startDate) conditions.push(eq(ApplicationWindowsTable.startDate, sanitizedFilters.startDate));
  if (sanitizedFilters.endDate) conditions.push(eq(ApplicationWindowsTable.endDate, sanitizedFilters.endDate));

  return db
    .select()
    .from(ApplicationWindowsTable)
    .where(conditions.length ? and(...conditions) : undefined);
};
