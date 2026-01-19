// src/applicationWindows/applicationWindows.service.ts

import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { ApplicationWindowsTable } from "../Drizzle/schema";

/* =============================
   CREATE A NEW APPLICATION WINDOW
============================= */
export const createWindowService = async (window: any) => {
  const [newWindow] = await db
    .insert(ApplicationWindowsTable)
    .values(window)
    .returning();
  return newWindow;
};

/* =============================
   GET ALL APPLICATION WINDOWS
============================= */
export const getAllWindowsService = async () => {
  return await db.query.ApplicationWindowsTable.findMany();
};

/* =============================
   GET APPLICATION WINDOW BY ID
============================= */
export const getWindowByIdService = async (id: number) => {
  return await db.query.ApplicationWindowsTable.findFirst({
    where: eq(ApplicationWindowsTable.windowID, id),
  });
};

/* =============================
   UPDATE APPLICATION WINDOW BY ID
============================= */
export const updateWindowService = async (id: number, data: Partial<any>) => {
  await db.update(ApplicationWindowsTable)
    .set(data)
    .where(eq(ApplicationWindowsTable.windowID, id));
  return "Application window updated successfully";
};

/* =============================
   DELETE APPLICATION WINDOW BY ID
============================= */
export const deleteWindowService = async (id: number) => {
  await db.delete(ApplicationWindowsTable)
    .where(eq(ApplicationWindowsTable.windowID, id));
  return "Application window deleted successfully";
};
