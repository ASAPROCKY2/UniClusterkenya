import db from "./db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import {
  UsersTable,
  KcseResultsTable,
  UniversitiesTable,
  ProgrammesTable,
  UniversityProgrammesTable,
  ProgrammeLevelsTable,
  ProgrammeClustersTable,
  ProgrammeClusterMapTable,
  ApplicationsTable,
  PlacementsTable,
} from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  /* =============================
     USERS
  ============================= */
  const passwordHash = await bcrypt.hash("Password123", 10);

  await db.insert(UsersTable).values([
    {
      email: "student1@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "Ian",
      lastName: "Kamunya",
      gender: "Male",
      citizenship: "Kenyan",
      kcseIndex: "123456789",
      meanGrade: "B+",
      agp: 12,
    },
    {
      email: "student2@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "Jane",
      lastName: "Wanjiku",
      gender: "Female",
      citizenship: "Kenyan",
      kcseIndex: "987654321",
      meanGrade: "B",
      agp: 10,
    },
    {
      email: "student3@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "Mark",
      lastName: "Otieno",
      gender: "Male",
      citizenship: "Kenyan",
      kcseIndex: "456789123",
      meanGrade: "A-",
      agp: 14,
    },
    {
      email: "admin1@test.com",
      passwordHash,
      role: "university_admin",
      isVerified: true,
      firstName: "Alice",
      lastName: "Njeri",
      gender: "Female",
      citizenship: "Kenyan",
    },
    {
      email: "sysadmin@test.com",
      passwordHash,
      role: "system_admin",
      isVerified: true,
      firstName: "Bob",
      lastName: "Mugambi",
      gender: "Male",
      citizenship: "Kenyan",
    },
  ]);

  /* =============================
     KCSE RESULTS
  ============================= */
  await db.insert(KcseResultsTable).values([
    { userID: 1, subjectCode: "101", subjectName: "English", grade: "B+", points: 10 },
    { userID: 1, subjectCode: "121", subjectName: "Mathematics", grade: "B", points: 9 },
    { userID: 2, subjectCode: "102", subjectName: "Kiswahili", grade: "B", points: 9 },
    { userID: 2, subjectCode: "231", subjectName: "Biology", grade: "C+", points: 7 },
    { userID: 3, subjectCode: "233", subjectName: "Chemistry", grade: "A-", points: 14 },
  ]);

  /* =============================
     UNIVERSITIES
  ============================= */
  await db.insert(UniversitiesTable).values([
    { name: "University of Nairobi", type: "Public", county: "Nairobi", governmentScholarship: true, helbEligible: true },
    { name: "Kenyatta University", type: "Public", county: "Kiambu", governmentScholarship: true, helbEligible: true },
    { name: "Mount Kenya University", type: "Private", county: "Thika", governmentScholarship: false, helbEligible: true },
    { name: "Moi University", type: "Public", county: "Uasin Gishu", governmentScholarship: true, helbEligible: true },
    { name: "Strathmore University", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
  ]);

  /* =============================
     PROGRAMMES
  ============================= */
  const programmesData = [
    { name: "Bachelor of Laws", level: "Degree" },
    { name: "Bachelor of Computer Science", level: "Degree" },
    { name: "Bachelor of Engineering", level: "Degree" },
    { name: "Diploma in Education", level: "Diploma" },
    { name: "Bachelor of Science in Nursing", level: "Degree" },
    { name: "Bachelor of Arts in Sociology", level: "Degree" },
    { name: "Bachelor of Business Administration", level: "Degree" },
    { name: "Diploma in IT", level: "Diploma" },
    { name: "Certificate in Hospitality", level: "Certificate" },
    { name: "Bachelor of Medicine", level: "Degree" },
    { name: "Bachelor of Surgery", level: "Degree" },
    { name: "Diploma in Community Health", level: "Diploma" },
    { name: "Bachelor of Commerce", level: "Degree" },
    { name: "Diploma in Accounting", level: "Diploma" },
    { name: "Certificate in Marketing", level: "Certificate" },
    { name: "Masters in Business Administration", level: "Masters" },
    { name: "Masters in Education", level: "Masters" },
    { name: "Masters in IT Management", level: "Masters" },
    { name: "Masters in Public Health", level: "Masters" },
    { name: "Masters in Finance", level: "Masters" },
    { name: "Diploma in Human Resource Management", level: "Diploma" },
    { name: "Bachelor of Architecture", level: "Degree" },
    { name: "Diploma in Journalism", level: "Diploma" },
    { name: "Bachelor of Environmental Science", level: "Degree" },
    { name: "Certificate in Graphic Design", level: "Certificate" },
    { name: "Diploma in Social Work", level: "Diploma" },
    { name: "Bachelor of Psychology", level: "Degree" },
    { name: "Certificate in Culinary Arts", level: "Certificate" },
    { name: "Masters in Data Science", level: "Masters" },
    { name: "Masters in Law", level: "Masters" },
  ];

  // Insert programmes and return typed IDs
  const insertedProgrammes = await db.insert(ProgrammesTable).values(programmesData).returning();

  const programmeIDs: number[] = insertedProgrammes.map((p: any) => Number(p.programmeID));

  /* =============================
     UNIVERSITY-PROGRAMMES
  ============================= */
  const universityProgrammesData = programmeIDs.flatMap((programmeID, index) => {
    const universityIDs = [(index % 5) + 1];
    return universityIDs.map((universityID) => ({
      universityID,
      programmeID,
      durationYears: "4.0", // keep as string if your column type is decimal
      minAGP: 10 + (index % 5),
      helbEligible: true as unknown as boolean, // cast to satisfy Drizzle
      scholarshipAvailable: (index % 2 === 0) as unknown as boolean, // cast
    }));
  });

  await db.insert(UniversityProgrammesTable).values(universityProgrammesData);

  /* =============================
     PROGRAMME LEVELS
  ============================= */
  await db.insert(ProgrammeLevelsTable).values([
    { name: "Degree", description: "Bachelor Degree Programmes" },
    { name: "Diploma", description: "Diploma / Level 6 Programmes" },
    { name: "Certificate", description: "Certificate / Level 5 Programmes" },
    { name: "Artisan", description: "Artisan / Level 4 Programmes" },
    { name: "Masters", description: "Masters / Postgraduate Programmes" },
  ]);

  /* =============================
     PROGRAMME CLUSTERS
  ============================= */
  await db.insert(ProgrammeClustersTable).values([
    { clusterCode: "CL1", name: "Law" },
    { clusterCode: "CL2", name: "Business, Hospitality & Related" },
    { clusterCode: "CL3", name: "Computing, IT & Related" },
    { clusterCode: "CL4", name: "Education & Related" },
    { clusterCode: "CL5", name: "Health & Related" },
  ]);

  /* =============================
     PROGRAMME ↔ CLUSTER MAP
  ============================= */
  await db.insert(ProgrammeClusterMapTable).values([
    { programmeID: 1, clusterID: 1 },
    { programmeID: 2, clusterID: 3 },
    { programmeID: 3, clusterID: 3 },
    { programmeID: 4, clusterID: 4 },
    { programmeID: 5, clusterID: 5 },
  ]);

  /* =============================
     APPLICATIONS
  ============================= */
  await db.insert(ApplicationsTable).values([
    { userID: 1, programmeID: 2, choiceOrder: 1, applicationDate: "2026-01-10", status: "Pending", clusterScore: "42.50" },
    { userID: 2, programmeID: 1, choiceOrder: 1, applicationDate: "2026-01-12", status: "Pending", clusterScore: "40.00" },
    { userID: 3, programmeID: 4, choiceOrder: 1, applicationDate: "2026-01-15", status: "Pending", clusterScore: "44.75" },
    { userID: 1, programmeID: 3, choiceOrder: 2, applicationDate: "2026-01-18", status: "Pending", clusterScore: "38.50" },
    { userID: 2, programmeID: 5, choiceOrder: 2, applicationDate: "2026-01-20", status: "Pending", clusterScore: "39.25" },
  ]);

  /* =============================
     PLACEMENTS
  ============================= */
  await db.insert(PlacementsTable).values([
    { userID: 1, programmeID: 2, placementStatus: "Placed", placementDate: "2026-03-01" },
    { userID: 2, programmeID: 1, placementStatus: "Placed", placementDate: "2026-03-05" },
    { userID: 3, programmeID: 4, placementStatus: "Placed", placementDate: "2026-03-10" },
    { userID: 1, programmeID: 3, placementStatus: "Not Placed", placementDate: null },
    { userID: 2, programmeID: 5, placementStatus: "Not Placed", placementDate: null },
  ]);

  console.log(" Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(" Seeding failed:", err);
  process.exit(1);
});
