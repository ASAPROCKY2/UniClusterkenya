// src/dashboard/dashboard.service.ts
import db from "../Drizzle/db";
import {
  UsersTable,
  UniversitiesTable,
  ProgrammesTable,
  ApplicationsTable,
  PlacementsTable,
} from "../Drizzle/schema";
import { eq, sql } from "drizzle-orm";

// ================= MAIN DASHBOARD TOTALS =================
export const getDashboardStatsService = async () => {
  const students = await db.query.UsersTable.findMany({
    where: eq(UsersTable.role, "student"),
  });

  const universities = await db.query.UniversitiesTable.findMany();
  const programmes = await db.query.ProgrammesTable.findMany();
  const applications = await db.query.ApplicationsTable.findMany();
  const placements = await db.query.PlacementsTable.findMany();

  return {
    students: students.length,
    universities: universities.length,
    programmes: programmes.length,
    applications: applications.length,
    placements: placements.length,
  };
};

// 🔹 Placements grouped by month
export const getPlacementsPerMonthService = async () => {
  return await db
    .select({
      month: sql`TO_CHAR(placements.created_at, 'YYYY-MM')`.as("month"),
      count: sql`COUNT(*)`.as("count"),
    })
    .from(PlacementsTable)
    .groupBy(sql`TO_CHAR(placements.created_at, 'YYYY-MM')`)
    .orderBy(sql`TO_CHAR(placements.created_at, 'YYYY-MM')`);
};

// 🔹 Applications grouped by month
export const getApplicationsPerMonthService = async () => {
  return await db
    .select({
      month: sql`TO_CHAR(applications.created_at, 'YYYY-MM')`.as("month"),
      count: sql`COUNT(*)`.as("count"),
    })
    .from(ApplicationsTable)
    .groupBy(sql`TO_CHAR(applications.created_at, 'YYYY-MM')`)
    .orderBy(sql`TO_CHAR(applications.created_at, 'YYYY-MM')`);
};

//  Combined analytics (all grouped data at once)
export const getAnalyticsService = async () => {
  const [placementsPerMonth, applicationsPerMonth] = await Promise.all([
    getPlacementsPerMonthService(),
    getApplicationsPerMonthService(),
  ]);

  return {
    placementsPerMonth,
    applicationsPerMonth,
  };
};
