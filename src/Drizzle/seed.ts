import db from "./db";
import {
  UsersTable,
  KcseResultsTable,
  UniversitiesTable,
  ProgrammesTable,
  ApplicationsTable,
  PlacementsTable,
  ApplicationWindowsTable,
  NotificationsTable,
} from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database started...");

  // =============================
  // UNIVERSITIES
  // =============================
  await db.insert(UniversitiesTable).values([
    { name: "Nairobi University", type: "Public", county: "Nairobi", governmentScholarship: true, helbEligible: true },
    { name: "Kisumu Institute", type: "Private", county: "Kisumu", governmentScholarship: false, helbEligible: true },
    { name: "Eldoret TVET", type: "TVET", county: "Uasin Gishu", governmentScholarship: false, helbEligible: false },
    { name: "Mombasa University", type: "Public", county: "Mombasa", governmentScholarship: true, helbEligible: true },
    { name: "Nakuru Polytechnic", type: "TVET", county: "Nakuru", governmentScholarship: false, helbEligible: false },
    { name: "Mount Kenya University", type: "Private", county: "Thika", governmentScholarship: false, helbEligible: true },
  ]);

  // =============================
  // PROGRAMMES
  // =============================
  await db.insert(ProgrammesTable).values([
    { universityID: 1, name: "Computer Science", level: "Bachelor", durationYears: 4.0, minAGP: 12, helbEligible: true, scholarshipAvailable: true },
    { universityID: 2, name: "Business Management", level: "Bachelor", durationYears: 4.0, minAGP: 10, helbEligible: true, scholarshipAvailable: false },
    { universityID: 3, name: "Mechanical Engineering", level: "Diploma", durationYears: 2.0, minAGP: 8, helbEligible: false, scholarshipAvailable: true },
    { universityID: 4, name: "Law", level: "Bachelor", durationYears: 4.0, minAGP: 11, helbEligible: true, scholarshipAvailable: true },
    { universityID: 5, name: "Education", level: "Diploma", durationYears: 2.0, minAGP: 9, helbEligible: false, scholarshipAvailable: false },
    { universityID: 6, name: "Agriculture", level: "Bachelor", durationYears: 4.0, minAGP: 10, helbEligible: true, scholarshipAvailable: true },
  ] as any);

  // =============================
  // USERS (with student fields merged)
  // =============================
  const passwordHash = await bcrypt.hash("Password123", 10);
  await db.insert(UsersTable).values([
    { email: "john@example.com", passwordHash, role: "student", isVerified: true, firstName: "John", lastName: "Doe", phoneNumber: "0712345678", gender: "Male", citizenship: "Kenyan", highSchool: "Nairobi High", kcseIndex: "A12345", meanGrade: "A", agp: 12, photoURL: "" },
    { email: "jane@example.com", passwordHash, role: "student", isVerified: true, firstName: "Jane", lastName: "Smith", phoneNumber: "0723456789", gender: "Female", citizenship: "Kenyan", highSchool: "Kisumu Girls", kcseIndex: "B12345", meanGrade: "B", agp: 10, photoURL: "" },
    { email: "alice@example.com", passwordHash, role: "student", isVerified: true, firstName: "Alice", lastName: "Wanjiku", phoneNumber: "0734567890", gender: "Female", citizenship: "Kenyan", highSchool: "Eldoret High", kcseIndex: "C12345", meanGrade: "B", agp: 11, photoURL: "" },
    { email: "bob@example.com", passwordHash, role: "student", isVerified: true, firstName: "Bob", lastName: "Otieno", phoneNumber: "0745678901", gender: "Male", citizenship: "Kenyan", highSchool: "Mombasa High", kcseIndex: "D12345", meanGrade: "C", agp: 9, photoURL: "" },
    { email: "charlie@example.com", passwordHash, role: "student", isVerified: true, firstName: "Charlie", lastName: "Kamau", phoneNumber: "0756789012", gender: "Male", citizenship: "Kenyan", highSchool: "Nakuru Boys", kcseIndex: "E12345", meanGrade: "A", agp: 12, photoURL: "" },
    { email: "diana@example.com", passwordHash, role: "student", isVerified: true, firstName: "Diana", lastName: "Njeri", phoneNumber: "0767890123", gender: "Female", citizenship: "Kenyan", highSchool: "Mount Kenya High", kcseIndex: "F12345", meanGrade: "B", agp: 11, photoURL: "" },
  ]);

  // =============================
  // KCSE RESULTS
  // =============================
  await db.insert(KcseResultsTable).values([
    { userID: 1, subjectCode: "ENG", subjectName: "English", grade: "A", points: 12 },
    { userID: 1, subjectCode: "MAT", subjectName: "Mathematics", grade: "A", points: 12 },
    { userID: 2, subjectCode: "ENG", subjectName: "English", grade: "B", points: 10 },
    { userID: 2, subjectCode: "MAT", subjectName: "Mathematics", grade: "B", points: 10 },
    { userID: 3, subjectCode: "ENG", subjectName: "English", grade: "B", points: 11 },
    { userID: 3, subjectCode: "MAT", subjectName: "Mathematics", grade: "A", points: 12 },
  ]);

  // =============================
  // APPLICATION WINDOWS
  // =============================
  await db.insert(ApplicationWindowsTable).values([
    { name: "Semester 1", startDate: "2026-01-01", endDate: "2026-01-31", isActive: true },
    { name: "Semester 2", startDate: "2026-05-01", endDate: "2026-05-31", isActive: false },
    { name: "Semester 3", startDate: "2026-09-01", endDate: "2026-09-30", isActive: false },
    { name: "Semester 4", startDate: "2027-01-01", endDate: "2027-01-31", isActive: false },
    { name: "Semester 5", startDate: "2027-05-01", endDate: "2027-05-31", isActive: false },
    { name: "Semester 6", startDate: "2027-09-01", endDate: "2027-09-30", isActive: false },
  ]);

  // =============================
  // APPLICATIONS
  // =============================
  await db.insert(ApplicationsTable).values([
    { userID: 1, programmeID: 1, choiceOrder: 1, applicationDate: "2026-01-05", status: "Pending", clusterScore: 90.0 },
    { userID: 2, programmeID: 2, choiceOrder: 1, applicationDate: "2026-01-06", status: "Pending", clusterScore: 85.5 },
    { userID: 3, programmeID: 3, choiceOrder: 1, applicationDate: "2026-01-07", status: "Pending", clusterScore: 88.0 },
    { userID: 4, programmeID: 4, choiceOrder: 1, applicationDate: "2026-01-08", status: "Pending", clusterScore: 92.5 },
    { userID: 5, programmeID: 5, choiceOrder: 1, applicationDate: "2026-01-09", status: "Pending", clusterScore: 80.0 },
    { userID: 6, programmeID: 6, choiceOrder: 1, applicationDate: "2026-01-10", status: "Pending", clusterScore: 89.75 },
  ] as any);

  // =============================
  // PLACEMENTS
  // =============================
  await db.insert(PlacementsTable).values([
    { userID: 1, programmeID: 1, placementStatus: "Placed", placementDate: "2026-02-01" },
    { userID: 2, programmeID: 2, placementStatus: "Placed", placementDate: "2026-02-02" },
    { userID: 3, programmeID: 3, placementStatus: "Not Placed", placementDate: "2026-02-03" },
    { userID: 4, programmeID: 4, placementStatus: "Placed", placementDate: "2026-02-04" },
    { userID: 5, programmeID: 5, placementStatus: "Not Placed", placementDate: "2026-02-05" },
    { userID: 6, programmeID: 6, placementStatus: "Placed", placementDate: "2026-02-06" },
  ]);

  // =============================
  // NOTIFICATIONS
  // =============================
  await db.insert(NotificationsTable).values([
    { userID: 1, userRole: "student", message: "Welcome to UniCluster!", isRead: false, createdAt: "2026-01-01" },
    { userID: 2, userRole: "student", message: "Application submitted successfully.", isRead: false, createdAt: "2026-01-02" },
    { userID: 3, userRole: "student", message: "Your cluster score is ready.", isRead: false, createdAt: "2026-01-03" },
    { userID: 4, userRole: "student", message: "Application approved.", isRead: false, createdAt: "2026-01-04" },
    { userID: 5, userRole: "student", message: "Placement notification.", isRead: false, createdAt: "2026-01-05" },
    { userID: 6, userRole: "student", message: "New programme available.", isRead: false, createdAt: "2026-01-06" },
  ]);

  console.log("Seeding database completed successfully.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
