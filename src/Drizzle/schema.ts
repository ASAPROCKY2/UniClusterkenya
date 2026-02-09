import { relations, InferModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  decimal,
  timestamp,
  boolean,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";

/* =============================
   ENUMS
============================= */
export const roleEnum = pgEnum("role", [
  "student",
  "university_admin",
  "system_admin",
]);

/* =============================
   USERS TABLE
============================= */
export const UsersTable = pgTable("users", {
  userID: serial("userID").primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  role: roleEnum("role").default("student"),
  isVerified: boolean("isVerified").default(false),
  verificationCode: varchar("verificationCode", { length: 6 }),
  verificationCodeExpiresAt: timestamp("verificationCodeExpiresAt"),

  firstName: varchar("firstName", { length: 50 }),
  lastName: varchar("lastName", { length: 50 }),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  gender: varchar("gender", { length: 10 }),
  citizenship: varchar("citizenship", { length: 50 }),
  highSchool: varchar("highSchool", { length: 100 }),
  kcseIndex: varchar("kcseIndex", { length: 20 }),
  meanGrade: varchar("meanGrade", { length: 2 }),
  agp: integer("agp"),
  photoURL: text("photoURL"),

  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

/* =============================
   KCSE RESULTS TABLE
============================= */
export const KcseResultsTable = pgTable("kcse_results", {
  resultID: serial("resultID").primaryKey(),
  userID: integer("userID")
    .notNull()
    .references(() => UsersTable.userID, { onDelete: "cascade" }),
  subjectCode: varchar("subjectCode", { length: 10 }).notNull(),
  subjectName: varchar("subjectName", { length: 50 }).notNull(),
  grade: varchar("grade", { length: 2 }).notNull(),
  points: integer("points").notNull(),
});

/* =============================
   UNIVERSITIES TABLE
============================= */
export const UniversitiesTable = pgTable("universities", {
  universityID: serial("universityID").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  county: varchar("county", { length: 50 }),
  logoURL: text("logoURL"),
  governmentScholarship: boolean("governmentScholarship").default(false),
  helbEligible: boolean("helbEligible").default(false),
});

/* =============================
   PROGRAMMES TABLE
============================= */
export const ProgrammesTable = pgTable("programmes", {
  programmeID: serial("programmeID").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  level: varchar("level", { length: 50 }),
});

/* =============================
   UNIVERSITY-PROGRAMMES JOIN
============================= */
export const UniversityProgrammesTable = pgTable("university_programmes", {
  id: serial("id").primaryKey(),
  universityID: integer("universityID")
    .notNull()
    .references(() => UniversitiesTable.universityID, { onDelete: "cascade" }),
  programmeID: integer("programmeID")
    .notNull()
    .references(() => ProgrammesTable.programmeID, { onDelete: "cascade" }),
  durationYears: decimal("durationYears", { precision: 2, scale: 1 }),
  minAGP: integer("minAGP"),
  helbEligible: boolean("helbEligible").default(false),
  scholarshipAvailable: boolean("scholarshipAvailable").default(false),
});

/* =============================
   PROGRAMME LEVELS
============================= */
export const ProgrammeLevelsTable = pgTable("programme_levels", {
  levelID: serial("levelID").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  description: text("description"),
});

/* =============================
   PROGRAMME CLUSTERS
============================= */
export const ProgrammeClustersTable = pgTable("programme_clusters", {
  clusterID: serial("clusterID").primaryKey(),
  clusterCode: varchar("clusterCode", { length: 20 }).notNull(),
  name: varchar("name", { length: 150 }).notNull(),
});

/* =============================
   PROGRAMME ↔ CLUSTER MAP
============================= */
export const ProgrammeClusterMapTable = pgTable("programme_cluster_map", {
  id: serial("id").primaryKey(),
  programmeID: integer("programmeID")
    .notNull()
    .references(() => ProgrammesTable.programmeID, { onDelete: "cascade" }),
  clusterID: integer("clusterID")
    .notNull()
    .references(() => ProgrammeClustersTable.clusterID, { onDelete: "cascade" }),
});

/* =========================================================
   🆕 PROGRAMME CLUSTER SUBJECT REQUIREMENTS (NEW)
========================================================= */
export const ProgrammeClusterSubjectsTable = pgTable(
  "programme_cluster_subjects",
  {
    id: serial("id").primaryKey(),

    clusterID: integer("clusterID")
      .notNull()
      .references(() => ProgrammeClustersTable.clusterID, {
        onDelete: "cascade",
      }),

    subjectCode: varchar("subjectCode", { length: 10 }).notNull(),
    subjectName: varchar("subjectName", { length: 50 }).notNull(),

    minPoints: integer("minPoints").notNull(),

    // Used for OR logic (Physics OR Computer Studies)
    alternativeGroup: integer("alternativeGroup"),
  }
);

/* =============================
   APPLICATIONS TABLE (FIXED)
============================= */
export const ApplicationsTable = pgTable("applications", {
  applicationID: serial("applicationID").primaryKey(),
  userID: integer("userID")
    .notNull()
    .references(() => UsersTable.userID, { onDelete: "cascade" }),
  programmeID: integer("programmeID")
    .notNull()
    .references(() => ProgrammesTable.programmeID, { onDelete: "cascade" }),
  clusterID: integer("clusterID")
    .references(() => ProgrammeClustersTable.clusterID, { onDelete: "set null" }),
  choiceOrder: integer("choiceOrder").notNull(),
  applicationDate: date("applicationDate").notNull(),
  status: varchar("status", { length: 50 }).default("Pending"),
  clusterScore: decimal("clusterScore", { precision: 5, scale: 2 }),
});

/* =============================
   PLACEMENTS TABLE
============================= */
export const PlacementsTable = pgTable("placements", {
  placementID: serial("placementID").primaryKey(),
  userID: integer("userID")
    .notNull()
    .references(() => UsersTable.userID, { onDelete: "cascade" }),
  programmeID: integer("programmeID")
    .notNull()
    .references(() => ProgrammesTable.programmeID, { onDelete: "cascade" }),
  placementStatus: varchar("placementStatus", { length: 50 }).default(
    "Not Placed"
  ),
  placementDate: date("placementDate"),
});

/* =============================
   APPLICATION WINDOWS
============================= */
export const ApplicationWindowsTable = pgTable("application_windows", {
  windowID: serial("windowID").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  isActive: boolean("isActive").default(false),
});

/* =============================
   NOTIFICATIONS
============================= */
export const NotificationsTable = pgTable("notifications", {
  notificationID: serial("notificationID").primaryKey(),
  userID: integer("userID").notNull(),
  userRole: varchar("userRole", { length: 50 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false),
  createdAt: date("createdAt").notNull(),
});

/* =============================
   RELATIONS
============================= */

export const UserRelations = relations(UsersTable, ({ many }) => ({
  kcseResults: many(KcseResultsTable),
  applications: many(ApplicationsTable),
  placements: many(PlacementsTable),
}));

export const KcseResultsRelations = relations(KcseResultsTable, ({ one }) => ({
  student: one(UsersTable, {
    fields: [KcseResultsTable.userID],
    references: [UsersTable.userID],
  }),
}));

export const UniversitiesRelations = relations(UniversitiesTable, ({ many }) => ({
  universityProgrammes: many(UniversityProgrammesTable),
}));

export const ProgrammesRelations = relations(ProgrammesTable, ({ many }) => ({
  universityProgrammes: many(UniversityProgrammesTable),
  clusterMaps: many(ProgrammeClusterMapTable),
  applications: many(ApplicationsTable),
  placements: many(PlacementsTable),
}));

export const UniversityProgrammesRelations = relations(
  UniversityProgrammesTable,
  ({ one }) => ({
    university: one(UniversitiesTable, {
      fields: [UniversityProgrammesTable.universityID],
      references: [UniversitiesTable.universityID],
    }),
    programme: one(ProgrammesTable, {
      fields: [UniversityProgrammesTable.programmeID],
      references: [ProgrammesTable.programmeID],
    }),
  })
);

export const ProgrammeClusterRelations = relations(
  ProgrammeClusterMapTable,
  ({ one }) => ({
    programme: one(ProgrammesTable, {
      fields: [ProgrammeClusterMapTable.programmeID],
      references: [ProgrammesTable.programmeID],
    }),
    cluster: one(ProgrammeClustersTable, {
      fields: [ProgrammeClusterMapTable.clusterID],
      references: [ProgrammeClustersTable.clusterID],
    }),
  })
);

/* 🆕 Cluster → Subjects relation */
export const ProgrammeClusterSubjectsRelations = relations(
  ProgrammeClusterSubjectsTable,
  ({ one }) => ({
    cluster: one(ProgrammeClustersTable, {
      fields: [ProgrammeClusterSubjectsTable.clusterID],
      references: [ProgrammeClustersTable.clusterID],
    }),
  })
);

/* 🆕 APPLICATION → CLUSTER relation */
export const ApplicationsRelations = relations(ApplicationsTable, ({ one }) => ({
  student: one(UsersTable, {
    fields: [ApplicationsTable.userID],
    references: [UsersTable.userID],
  }),
  programme: one(ProgrammesTable, {
    fields: [ApplicationsTable.programmeID],
    references: [ProgrammesTable.programmeID],
  }),
  cluster: one(ProgrammeClustersTable, {
    fields: [ApplicationsTable.clusterID],
    references: [ProgrammeClustersTable.clusterID],
  }),
}));

export const PlacementsRelations = relations(PlacementsTable, ({ one }) => ({
  student: one(UsersTable, {
    fields: [PlacementsTable.userID],
    references: [UsersTable.userID],
  }),
  programme: one(ProgrammesTable, {
    fields: [PlacementsTable.programmeID],
    references: [ProgrammesTable.programmeID],
  }),
}));

/* =============================
   INFERRED TYPES
============================= */
export type TIUser = InferModel<typeof UsersTable, "insert">;
export type TSUser = InferModel<typeof UsersTable, "select">;

export type TIKcseResult = InferModel<typeof KcseResultsTable, "insert">;
export type TSKcseResult = InferModel<typeof KcseResultsTable, "select">;

export type TIUniversity = InferModel<typeof UniversitiesTable, "insert">;
export type TSUniversity = InferModel<typeof UniversitiesTable, "select">;

export type TIProgramme = InferModel<typeof ProgrammesTable, "insert">;
export type TSProgramme = InferModel<typeof ProgrammesTable, "select">;

export type TIUniversityProgramme =
  InferModel<typeof UniversityProgrammesTable, "insert">;
export type TSUniversityProgramme =
  InferModel<typeof UniversityProgrammesTable, "select">;

export type TIApplication = InferModel<typeof ApplicationsTable, "insert">;
export type TSApplication = InferModel<typeof ApplicationsTable, "select">;

export type TIPlacement = InferModel<typeof PlacementsTable, "insert">;
export type TSPlacement = InferModel<typeof PlacementsTable, "select">;

export type TIApplicationWindow =
  InferModel<typeof ApplicationWindowsTable, "insert">;
export type TSApplicationWindow =
  InferModel<typeof ApplicationWindowsTable, "select">;

export type TINotification =
  InferModel<typeof NotificationsTable, "insert">;
export type TSNotification =
  InferModel<typeof NotificationsTable, "select">;

/*  NEW TYPES */
export type TIProgrammeClusterSubject =
  InferModel<typeof ProgrammeClusterSubjectsTable, "insert">;
export type TSProgrammeClusterSubject =
  InferModel<typeof ProgrammeClusterSubjectsTable, "select">;
