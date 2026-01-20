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
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

/* =============================
   STUDENTS TABLE
============================= */
export const StudentsTable = pgTable("students", {
  studentID: serial("studentID").primaryKey(),
  userID: integer("userID")
    .notNull()
    .references(() => UsersTable.userID, { onDelete: "cascade" }),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  gender: varchar("gender", { length: 10 }).notNull(),
  citizenship: varchar("citizenship", { length: 50 }).notNull(),
  highSchool: varchar("highSchool", { length: 100 }).notNull(),
  kcseIndex: varchar("kcseIndex", { length: 20 }).notNull(),
  meanGrade: varchar("meanGrade", { length: 2 }).notNull(),
  agp: integer("agp").notNull(),
  photoURL: text("photoURL"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

/* =============================
   KCSE RESULTS TABLE
============================= */
export const KcseResultsTable = pgTable("kcse_results", {
  resultID: serial("resultID").primaryKey(),
  studentID: integer("studentID")
    .notNull()
    .references(() => StudentsTable.studentID, { onDelete: "cascade" }),
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
  universityID: integer("universityID")
    .notNull()
    .references(() => UniversitiesTable.universityID, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  level: varchar("level", { length: 50 }),
  durationYears: decimal("durationYears", { precision: 2, scale: 1 }),
  minAGP: integer("minAGP"),
  helbEligible: boolean("helbEligible").default(false),
  scholarshipAvailable: boolean("scholarshipAvailable").default(false),
});

/* =============================
   APPLICATIONS TABLE
============================= */
export const ApplicationsTable = pgTable("applications", {
  applicationID: serial("applicationID").primaryKey(),
  studentID: integer("studentID")
    .notNull()
    .references(() => StudentsTable.studentID, { onDelete: "cascade" }),
  programmeID: integer("programmeID")
    .notNull()
    .references(() => ProgrammesTable.programmeID, { onDelete: "cascade" }),
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
  studentID: integer("studentID")
    .notNull()
    .references(() => StudentsTable.studentID, { onDelete: "cascade" }),
  programmeID: integer("programmeID")
    .notNull()
    .references(() => ProgrammesTable.programmeID, { onDelete: "cascade" }),
  placementStatus: varchar("placementStatus", { length: 50 }).default("Not Placed"),
  placementDate: date("placementDate"),
});

/* =============================
   APPLICATION WINDOWS TABLE
============================= */
export const ApplicationWindowsTable = pgTable("application_windows", {
  windowID: serial("windowID").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  isActive: boolean("isActive").default(false),
});

/* =============================
   NOTIFICATIONS TABLE
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

// USER RELATIONS
export const UserRelations = relations(UsersTable, ({ one }) => ({
  student: one(StudentsTable, {
    fields: [UsersTable.userID],
    references: [StudentsTable.userID],
  }),
}));

// STUDENT RELATIONS
export const StudentRelations = relations(StudentsTable, ({ one, many }) => ({
  user: one(UsersTable, {
    fields: [StudentsTable.userID],
    references: [UsersTable.userID],
  }),
  kcseResults: many(KcseResultsTable),
  applications: many(ApplicationsTable),
  placements: many(PlacementsTable),
}));

// KCSE RESULTS RELATION
export const KcseResultRelations = relations(KcseResultsTable, ({ one }) => ({
  student: one(StudentsTable, {
    fields: [KcseResultsTable.studentID],
    references: [StudentsTable.studentID],
  }),
}));

// UNIVERSITY RELATIONS
export const UniversityRelations = relations(UniversitiesTable, ({ many }) => ({
  programmes: many(ProgrammesTable),
}));

// PROGRAMME RELATIONS
export const ProgrammeRelations = relations(ProgrammesTable, ({ one, many }) => ({
  university: one(UniversitiesTable, {
    fields: [ProgrammesTable.universityID],
    references: [UniversitiesTable.universityID],
  }),
  applications: many(ApplicationsTable),
  placements: many(PlacementsTable),
}));

// APPLICATION RELATIONS
export const ApplicationRelations = relations(ApplicationsTable, ({ one }) => ({
  student: one(StudentsTable, {
    fields: [ApplicationsTable.studentID],
    references: [StudentsTable.studentID],
  }),
  programme: one(ProgrammesTable, {
    fields: [ApplicationsTable.programmeID],
    references: [ProgrammesTable.programmeID],
  }),
}));

// PLACEMENT RELATIONS
export const PlacementRelations = relations(PlacementsTable, ({ one }) => ({
  student: one(StudentsTable, {
    fields: [PlacementsTable.studentID],
    references: [StudentsTable.studentID],
  }),
  programme: one(ProgrammesTable, {
    fields: [PlacementsTable.programmeID],
    references: [ProgrammesTable.programmeID],
  }),
}));

/* =============================
   INFERRED TYPES
============================= */

// USERS
export type TIUser = InferModel<typeof UsersTable, "insert">;
export type TSUser = InferModel<typeof UsersTable, "select">;

// STUDENTS
export type TIStudent = InferModel<typeof StudentsTable, "insert">;
export type TSStudent = InferModel<typeof StudentsTable, "select">;

// KCSE RESULTS
export type TIKcseResult = InferModel<typeof KcseResultsTable, "insert">;
export type TSKcseResult = InferModel<typeof KcseResultsTable, "select">;

// UNIVERSITIES
export type TIUniversity = InferModel<typeof UniversitiesTable, "insert">;
export type TSUniversity = InferModel<typeof UniversitiesTable, "select">;

// PROGRAMMES
export type TIProgramme = InferModel<typeof ProgrammesTable, "insert">;
export type TSProgramme = InferModel<typeof ProgrammesTable, "select">;

// APPLICATIONS
export type TIApplication = InferModel<typeof ApplicationsTable, "insert">;
export type TSApplication = InferModel<typeof ApplicationsTable, "select">;

// PLACEMENTS
export type TIPlacement = InferModel<typeof PlacementsTable, "insert">;
export type TSPlacement = InferModel<typeof PlacementsTable, "select">;

// APPLICATION WINDOWS
export type TIApplicationWindow = InferModel<typeof ApplicationWindowsTable, "insert">;
export type TSApplicationWindow = InferModel<typeof ApplicationWindowsTable, "select">;

// NOTIFICATIONS
export type TINotification = InferModel<typeof NotificationsTable, "insert">;
export type TSNotification = InferModel<typeof NotificationsTable, "select">;
