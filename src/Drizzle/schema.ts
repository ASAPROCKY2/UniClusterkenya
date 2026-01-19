import { relations } from "drizzle-orm";
import { serial, varchar, text, integer, boolean, decimal, date, pgTable } from "drizzle-orm/pg-core";

/* =============================
   STUDENTS TABLE
============================= */
export const StudentsTable = pgTable("students", {
    studentID: serial("studentID").primaryKey(),
    firstName: varchar("firstName", { length: 50 }).notNull(),
    lastName: varchar("lastName", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    phoneNumber: varchar("phoneNumber", { length: 20 }),
    gender: varchar("gender", { length: 10 }).notNull(),
    citizenship: varchar("citizenship", { length: 50 }).notNull(),
    highSchool: varchar("highSchool", { length: 100 }).notNull(),
    kcseIndex: varchar("kcseIndex", { length: 20 }).notNull(),
    meanGrade: varchar("meanGrade", { length: 2 }).notNull(),
    agp: integer("agp").notNull(),
    photoURL: text("photoURL") // Cloudinary student photo
});

/* =============================
   KCSE RESULTS TABLE
============================= */
export const KcseResultsTable = pgTable("kcse_results", {
    resultID: serial("resultID").primaryKey(),
    studentID: integer("studentID").notNull().references(() => StudentsTable.studentID, { onDelete: "cascade" }),
    subjectCode: varchar("subjectCode", { length: 10 }).notNull(),
    subjectName: varchar("subjectName", { length: 50 }).notNull(),
    grade: varchar("grade", { length: 2 }).notNull(),
    points: integer("points").notNull()
});

/* =============================
   UNIVERSITIES TABLE
============================= */
export const UniversitiesTable = pgTable("universities", {
    universityID: serial("universityID").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    type: varchar("type", { length: 50 }).notNull(), // public/private/TVET
    county: varchar("county", { length: 50 }),
    logoURL: text("logoURL"), // Cloudinary university logo
    governmentScholarship: boolean("governmentScholarship").default(false),
    helbEligible: boolean("helbEligible").default(false)
});

/* =============================
   PROGRAMMES TABLE
============================= */
export const ProgrammesTable = pgTable("programmes", {
    programmeID: serial("programmeID").primaryKey(),
    universityID: integer("universityID").notNull().references(() => UniversitiesTable.universityID, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    level: varchar("level", { length: 50 }), // diploma, bachelor
    durationYears: decimal("durationYears", { precision: 2, scale: 1 }),
    minAGP: integer("minAGP"),
    helbEligible: boolean("helbEligible").default(false),
    scholarshipAvailable: boolean("scholarshipAvailable").default(false)
});

/* =============================
   STUDENT APPLICATIONS TABLE
============================= */
export const ApplicationsTable = pgTable("applications", {
    applicationID: serial("applicationID").primaryKey(),
    studentID: integer("studentID").notNull().references(() => StudentsTable.studentID, { onDelete: "cascade" }),
    programmeID: integer("programmeID").notNull().references(() => ProgrammesTable.programmeID, { onDelete: "cascade" }),
    choiceOrder: integer("choiceOrder").notNull(),
    applicationDate: date("applicationDate").notNull(),
    status: varchar("status", { length: 50 }).default("Pending"),
    clusterScore: decimal("clusterScore", { precision: 5, scale: 2 })
});

/* =============================
   PLACEMENTS TABLE
============================= */
export const PlacementsTable = pgTable("placements", {
    placementID: serial("placementID").primaryKey(),
    studentID: integer("studentID").notNull().references(() => StudentsTable.studentID, { onDelete: "cascade" }),
    programmeID: integer("programmeID").notNull().references(() => ProgrammesTable.programmeID, { onDelete: "cascade" }),
    placementStatus: varchar("placementStatus", { length: 50 }).default("Not Placed"),
    placementDate: date("placementDate")
});

/* =============================
   APPLICATION WINDOWS TABLE
============================= */
export const ApplicationWindowsTable = pgTable("application_windows", {
    windowID: serial("windowID").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    startDate: date("startDate").notNull(),
    endDate: date("endDate").notNull(),
    isActive: boolean("isActive").default(false)
});

/* =============================
   NOTIFICATIONS TABLE
============================= */
export const NotificationsTable = pgTable("notifications", {
    notificationID: serial("notificationID").primaryKey(),
    userID: integer("userID").notNull(), // student/admin/university
    userRole: varchar("userRole", { length: 50 }).notNull(),
    message: text("message").notNull(),
    isRead: boolean("isRead").default(false),
    createdAt: date("createdAt").notNull()
});

/* =============================
   SYSTEM ADMINS TABLE
============================= */
export const SystemAdminsTable = pgTable("system_admins", {
    adminID: serial("adminID").primaryKey(),
    firstName: varchar("firstName", { length: 50 }).notNull(),
    lastName: varchar("lastName", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    passwordHash: text("passwordHash").notNull(),
    role: varchar("role", { length: 50 }).default("superadmin")
});

/* =============================
   UNIVERSITY ADMINS TABLE
============================= */
export const UniversityAdminsTable = pgTable("university_admins", {
    uniAdminID: serial("uniAdminID").primaryKey(),
    universityID: integer("universityID").notNull().references(() => UniversitiesTable.universityID, { onDelete: "cascade" }),
    firstName: varchar("firstName", { length: 50 }).notNull(),
    lastName: varchar("lastName", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    passwordHash: text("passwordHash").notNull(),
    role: varchar("role", { length: 50 }).default("admin")
});

/* =============================
   RELATIONSHIPS
============================= */

// STUDENT RELATIONS
export const StudentRelations = relations(StudentsTable, ({ many }) => ({
    kcseResults: many(KcseResultsTable),
    applications: many(ApplicationsTable),
    placements: many(PlacementsTable)
}));

// KCSE RESULTS RELATION
export const KcseResultRelations = relations(KcseResultsTable, ({ one }) => ({
    student: one(StudentsTable, {
        fields: [KcseResultsTable.studentID],
        references: [StudentsTable.studentID]
    })
}));

// UNIVERSITY RELATIONS
export const UniversityRelations = relations(UniversitiesTable, ({ many }) => ({
    programmes: many(ProgrammesTable),
    universityAdmins: many(UniversityAdminsTable)
}));

// PROGRAMME RELATIONS
export const ProgrammeRelations = relations(ProgrammesTable, ({ one, many }) => ({
    university: one(UniversitiesTable, {
        fields: [ProgrammesTable.universityID],
        references: [UniversitiesTable.universityID]
    }),
    applications: many(ApplicationsTable),
    placements: many(PlacementsTable)
}));

// APPLICATION RELATIONS
export const ApplicationRelations = relations(ApplicationsTable, ({ one }) => ({
    student: one(StudentsTable, {
        fields: [ApplicationsTable.studentID],
        references: [StudentsTable.studentID]
    }),
    programme: one(ProgrammesTable, {
        fields: [ApplicationsTable.programmeID],
        references: [ProgrammesTable.programmeID]
    })
}));

// PLACEMENT RELATIONS
export const PlacementRelations = relations(PlacementsTable, ({ one }) => ({
    student: one(StudentsTable, {
        fields: [PlacementsTable.studentID],
        references: [StudentsTable.studentID]
    }),
    programme: one(ProgrammesTable, {
        fields: [PlacementsTable.programmeID],
        references: [ProgrammesTable.programmeID]
    })
}));

// UNIVERSITY ADMIN RELATIONS
export const UniversityAdminRelations = relations(UniversityAdminsTable, ({ one }) => ({
    university: one(UniversitiesTable, {
        fields: [UniversityAdminsTable.universityID],
        references: [UniversitiesTable.universityID]
    })
}));
