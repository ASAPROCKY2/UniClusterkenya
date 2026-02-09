// seed.ts
import db from "./db";
import bcrypt from "bcryptjs";
import {
  UsersTable,
  KcseResultsTable,
  UniversitiesTable,
  ProgrammesTable,
  UniversityProgrammesTable,
  ProgrammeLevelsTable,
  ProgrammeClustersTable,
  ProgrammeClusterMapTable,
  ProgrammeClusterSubjectsTable,
  ApplicationsTable,
  PlacementsTable,
  ApplicationWindowsTable,
  NotificationsTable,
} from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  /* =============================
     USERS (10 users)
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
      kcseIndex: "12345678/2023",
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
      kcseIndex: "98765432/2023",
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
      kcseIndex: "45678912/2023",
      meanGrade: "A-",
      agp: 14,
    },
    {
      email: "student4@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "Grace",
      lastName: "Muthoni",
      gender: "Female",
      citizenship: "Kenyan",
      kcseIndex: "34567890/2023",
      meanGrade: "A",
      agp: 15,
    },
    {
      email: "student5@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "David",
      lastName: "Omondi",
      gender: "Male",
      citizenship: "Kenyan",
      kcseIndex: "56789012/2023",
      meanGrade: "B-",
      agp: 8,
    },
    {
      email: "student6@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "Sarah",
      lastName: "Akinyi",
      gender: "Female",
      citizenship: "Kenyan",
      kcseIndex: "67890123/2023",
      meanGrade: "C+",
      agp: 6,
    },
    // University Admins
    {
      email: "admin.uon@test.com",
      passwordHash,
      role: "university_admin",
      isVerified: true,
      firstName: "Prof. James",
      lastName: "Mwangi",
      gender: "Male",
      citizenship: "Kenyan",
    },
    {
      email: "admin.ku@test.com",
      passwordHash,
      role: "university_admin",
      isVerified: true,
      firstName: "Dr. Mary",
      lastName: "Wanjiru",
      gender: "Female",
      citizenship: "Kenyan",
    },
    // System Admins
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
    {
      email: "support@test.com",
      passwordHash,
      role: "system_admin",
      isVerified: true,
      firstName: "Linda",
      lastName: "Chebet",
      gender: "Female",
      citizenship: "Kenyan",
    },
  ]);

  /* =============================
     KCSE RESULTS
  ============================= */
  await db.insert(KcseResultsTable).values([
    // Ian Kamunya (B+)
    { userID: 1, subjectCode: "101", subjectName: "English", grade: "B+", points: 10 },
    { userID: 1, subjectCode: "121", subjectName: "Mathematics", grade: "B", points: 9 },
    { userID: 1, subjectCode: "565", subjectName: "Computer Studies", grade: "A-", points: 11 },
    { userID: 1, subjectCode: "233", subjectName: "Chemistry", grade: "B", points: 9 },
    
    // Jane Wanjiku (B)
    { userID: 2, subjectCode: "101", subjectName: "English", grade: "B", points: 9 },
    { userID: 2, subjectCode: "121", subjectName: "Mathematics", grade: "B-", points: 8 },
    { userID: 2, subjectCode: "231", subjectName: "Biology", grade: "C+", points: 7 },
    { userID: 2, subjectCode: "502", subjectName: "Business Studies", grade: "B", points: 9 },
    
    // Mark Otieno (A-)
    { userID: 3, subjectCode: "101", subjectName: "English", grade: "A-", points: 11 },
    { userID: 3, subjectCode: "121", subjectName: "Mathematics", grade: "B+", points: 10 },
    { userID: 3, subjectCode: "231", subjectName: "Biology", grade: "A-", points: 11 },
    { userID: 3, subjectCode: "233", subjectName: "Chemistry", grade: "B+", points: 10 },
    
    // Grace Muthoni (A)
    { userID: 4, subjectCode: "101", subjectName: "English", grade: "A", points: 12 },
    { userID: 4, subjectCode: "121", subjectName: "Mathematics", grade: "A-", points: 11 },
    { userID: 4, subjectCode: "231", subjectName: "Biology", grade: "A", points: 12 },
    { userID: 4, subjectCode: "233", subjectName: "Chemistry", grade: "A", points: 12 },
    
    // David Omondi (B-)
    { userID: 5, subjectCode: "101", subjectName: "English", grade: "B-", points: 8 },
    { userID: 5, subjectCode: "121", subjectName: "Mathematics", grade: "C+", points: 7 },
    { userID: 5, subjectCode: "502", subjectName: "Business Studies", grade: "B", points: 9 },
    { userID: 5, subjectCode: "565", subjectName: "Computer Studies", grade: "B-", points: 8 },
    
    // Sarah Akinyi (C+)
    { userID: 6, subjectCode: "101", subjectName: "English", grade: "C+", points: 7 },
    { userID: 6, subjectCode: "121", subjectName: "Mathematics", grade: "C", points: 6 },
    { userID: 6, subjectCode: "231", subjectName: "Biology", grade: "C", points: 6 },
    { userID: 6, subjectCode: "502", subjectName: "Business Studies", grade: "C+", points: 7 },
  ]);

  /* =============================
     UNIVERSITIES (20 universities)
  ============================= */
  await db.insert(UniversitiesTable).values([
    // Public Universities
    { name: "University of Nairobi", type: "Public", county: "Nairobi", governmentScholarship: true, helbEligible: true },
    { name: "Kenyatta University", type: "Public", county: "Kiambu", governmentScholarship: true, helbEligible: true },
    { name: "Moi University", type: "Public", county: "Uasin Gishu", governmentScholarship: true, helbEligible: true },
    { name: "Egerton University", type: "Public", county: "Nakuru", governmentScholarship: true, helbEligible: true },
    { name: "Maseno University", type: "Public", county: "Kisumu", governmentScholarship: true, helbEligible: true },
    { name: "Jomo Kenyatta University of Agriculture & Technology", type: "Public", county: "Kiambu", governmentScholarship: true, helbEligible: true },
    { name: "Technical University of Kenya", type: "Public", county: "Nairobi", governmentScholarship: true, helbEligible: true },
    { name: "Kisii University", type: "Public", county: "Kisii", governmentScholarship: true, helbEligible: true },
    { name: "Masinde Muliro University of Science & Technology", type: "Public", county: "Kakamega", governmentScholarship: true, helbEligible: true },
    { name: "Dedan Kimathi University of Technology", type: "Public", county: "Nyeri", governmentScholarship: true, helbEligible: true },
    
    // Private Universities
    { name: "Mount Kenya University", type: "Private", county: "Thika", governmentScholarship: false, helbEligible: true },
    { name: "Strathmore University", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
    { name: "United States International University Africa", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
    { name: "Daystar University", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
    { name: "Kabarak University", type: "Private", county: "Nakuru", governmentScholarship: false, helbEligible: true },
    { name: "Africa Nazarene University", type: "Private", county: "Kajiado", governmentScholarship: false, helbEligible: true },
    { name: "KCA University", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
    { name: "Zetech University", type: "Private", county: "Kiambu", governmentScholarship: false, helbEligible: true },
    { name: "Riara University", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
    { name: "Adventist University of Africa", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
  ]);

  /* =============================
     PROGRAMMES (40 programmes)
  ============================= */
  const programmesData = [
    // Engineering & Technology
    { name: "Bachelor of Science in Computer Science", level: "Degree" },
    { name: "Bachelor of Science in Software Engineering", level: "Degree" },
    { name: "Bachelor of Science in Information Technology", level: "Degree" },
    { name: "Bachelor of Science in Electrical & Electronics Engineering", level: "Degree" },
    { name: "Bachelor of Science in Civil Engineering", level: "Degree" },
    { name: "Bachelor of Science in Mechanical Engineering", level: "Degree" },
    { name: "Diploma in Computer Science", level: "Diploma" },
    { name: "Diploma in Electrical Engineering", level: "Diploma" },
    
    // Medicine & Health Sciences
    { name: "Bachelor of Medicine & Bachelor of Surgery", level: "Degree" },
    { name: "Bachelor of Science in Nursing", level: "Degree" },
    { name: "Bachelor of Pharmacy", level: "Degree" },
    { name: "Bachelor of Science in Public Health", level: "Degree" },
    { name: "Diploma in Clinical Medicine", level: "Diploma" },
    { name: "Diploma in Nursing", level: "Diploma" },
    
    // Business & Economics
    { name: "Bachelor of Commerce", level: "Degree" },
    { name: "Bachelor of Business Administration", level: "Degree" },
    { name: "Bachelor of Science in Economics", level: "Degree" },
    { name: "Bachelor of Science in Finance", level: "Degree" },
    { name: "Diploma in Business Management", level: "Diploma" },
    { name: "Diploma in Accounting", level: "Diploma" },
    
    // Law & Social Sciences
    { name: "Bachelor of Laws", level: "Degree" },
    { name: "Bachelor of Arts in Sociology", level: "Degree" },
    { name: "Bachelor of Arts in Psychology", level: "Degree" },
    { name: "Bachelor of Arts in Political Science", level: "Degree" },
    { name: "Diploma in Law", level: "Diploma" },
    { name: "Diploma in Social Work", level: "Diploma" },
    
    // Education
    { name: "Bachelor of Education (Arts)", level: "Degree" },
    { name: "Bachelor of Education (Science)", level: "Degree" },
    { name: "Bachelor of Education (Early Childhood)", level: "Degree" },
    { name: "Diploma in Education", level: "Diploma" },
    
    // Natural Sciences
    { name: "Bachelor of Science in Mathematics", level: "Degree" },
    { name: "Bachelor of Science in Physics", level: "Degree" },
    { name: "Bachelor of Science in Chemistry", level: "Degree" },
    { name: "Bachelor of Science in Biology", level: "Degree" },
    
    // Arts & Humanities
    { name: "Bachelor of Arts in Communication", level: "Degree" },
    { name: "Bachelor of Arts in Literature", level: "Degree" },
    { name: "Bachelor of Arts in History", level: "Degree" },
    { name: "Diploma in Journalism", level: "Diploma" },
    
    // Agriculture & Environment
    { name: "Bachelor of Science in Agriculture", level: "Degree" },
    { name: "Bachelor of Science in Environmental Science", level: "Degree" },
    { name: "Diploma in Agriculture", level: "Diploma" },
    
    // Certificate Programmes
    { name: "Certificate in Information Technology", level: "Certificate" },
    { name: "Certificate in Business Management", level: "Certificate" },
  ];

  await db.insert(ProgrammesTable).values(programmesData);

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
    { clusterCode: "CL6", name: "Engineering & Technology" },
    { clusterCode: "CL7", name: "Natural Sciences" },
    { clusterCode: "CL8", name: "Arts & Humanities" },
    { clusterCode: "CL9", name: "Agriculture & Environment" },
    { clusterCode: "CL10", name: "Social Sciences" },
  ]);

  /* =============================
     PROGRAMME ↔ CLUSTER MAP
  ============================= */
  await db.insert(ProgrammeClusterMapTable).values([
    // Law (CL1)
    { programmeID: 21, clusterID: 1 },
    
    // Business (CL2)
    { programmeID: 15, clusterID: 2 },
    { programmeID: 16, clusterID: 2 },
    { programmeID: 17, clusterID: 2 },
    { programmeID: 18, clusterID: 2 },
    { programmeID: 19, clusterID: 2 },
    { programmeID: 20, clusterID: 2 },
    { programmeID: 42, clusterID: 2 },
    
    // Computing & IT (CL3)
    { programmeID: 1, clusterID: 3 },
    { programmeID: 2, clusterID: 3 },
    { programmeID: 3, clusterID: 3 },
    { programmeID: 7, clusterID: 3 },
    { programmeID: 41, clusterID: 3 },
    
    // Education (CL4)
    { programmeID: 27, clusterID: 4 },
    { programmeID: 28, clusterID: 4 },
    { programmeID: 29, clusterID: 4 },
    { programmeID: 30, clusterID: 4 },
    
    // Health (CL5)
    { programmeID: 9, clusterID: 5 },
    { programmeID: 10, clusterID: 5 },
    { programmeID: 11, clusterID: 5 },
    { programmeID: 12, clusterID: 5 },
    { programmeID: 13, clusterID: 5 },
    { programmeID: 14, clusterID: 5 },
    
    // Engineering (CL6)
    { programmeID: 4, clusterID: 6 },
    { programmeID: 5, clusterID: 6 },
    { programmeID: 6, clusterID: 6 },
    { programmeID: 8, clusterID: 6 },
    
    // Natural Sciences (CL7)
    { programmeID: 31, clusterID: 7 },
    { programmeID: 32, clusterID: 7 },
    { programmeID: 33, clusterID: 7 },
    { programmeID: 34, clusterID: 7 },
    
    // Arts & Humanities (CL8)
    { programmeID: 22, clusterID: 8 },
    { programmeID: 23, clusterID: 8 },
    { programmeID: 35, clusterID: 8 },
    { programmeID: 36, clusterID: 8 },
    { programmeID: 37, clusterID: 8 },
    { programmeID: 38, clusterID: 8 },
    
    // Agriculture & Environment (CL9)
    { programmeID: 39, clusterID: 9 },
    { programmeID: 40, clusterID: 9 },
    
    // Social Sciences (CL10)
    { programmeID: 24, clusterID: 10 },
    { programmeID: 25, clusterID: 10 },
  ]);

  /* =============================
     PROGRAMME CLUSTER SUBJECT REQUIREMENTS
  ============================= */
  await db.insert(ProgrammeClusterSubjectsTable).values([
    // CL3: Computing & IT
    { clusterID: 3, subjectCode: "121", subjectName: "Mathematics", minPoints: 9, alternativeGroup: null },
    { clusterID: 3, subjectCode: "565", subjectName: "Computer Studies", minPoints: 10, alternativeGroup: null },
    { clusterID: 3, subjectCode: "101", subjectName: "English", minPoints: 9, alternativeGroup: null },
    { clusterID: 3, subjectCode: "233", subjectName: "Chemistry", minPoints: 8, alternativeGroup: null },
    
    // CL2: Business
    { clusterID: 2, subjectCode: "101", subjectName: "English", minPoints: 9, alternativeGroup: null },
    { clusterID: 2, subjectCode: "121", subjectName: "Mathematics", minPoints: 9, alternativeGroup: null },
    { clusterID: 2, subjectCode: "502", subjectName: "Business Studies", minPoints: 8, alternativeGroup: null },
    { clusterID: 2, subjectCode: "565", subjectName: "Computer Studies", minPoints: 8, alternativeGroup: 1 },
    
    // CL5: Health
    { clusterID: 5, subjectCode: "121", subjectName: "Mathematics", minPoints: 11, alternativeGroup: null },
    { clusterID: 5, subjectCode: "233", subjectName: "Chemistry", minPoints: 11, alternativeGroup: null },
    { clusterID: 5, subjectCode: "231", subjectName: "Biology", minPoints: 11, alternativeGroup: null },
    { clusterID: 5, subjectCode: "101", subjectName: "English", minPoints: 10, alternativeGroup: null },
    
    // CL6: Engineering
    { clusterID: 6, subjectCode: "121", subjectName: "Mathematics", minPoints: 11, alternativeGroup: null },
    { clusterID: 6, subjectCode: "233", subjectName: "Chemistry", minPoints: 11, alternativeGroup: null },
    { clusterID: 6, subjectCode: "232", subjectName: "Physics", minPoints: 11, alternativeGroup: null },
    { clusterID: 6, subjectCode: "101", subjectName: "English", minPoints: 10, alternativeGroup: null },
    
    // CL1: Law
    { clusterID: 1, subjectCode: "101", subjectName: "English", minPoints: 11, alternativeGroup: null },
    { clusterID: 1, subjectCode: "102", subjectName: "Kiswahili", minPoints: 9, alternativeGroup: null },
    { clusterID: 1, subjectCode: "311", subjectName: "History", minPoints: 9, alternativeGroup: null },
  ]);

  /* =============================
     UNIVERSITY-PROGRAMMES
  ============================= */
  // Create some university-programme relationships
  const universityProgrammesData = [];
  for (let programmeID = 1; programmeID <= 42; programmeID++) {
    // Each programme in 2-3 universities
    const numUniversities = Math.floor(Math.random() * 2) + 2;
    const selectedUnis = new Set<number>();
    
    while (selectedUnis.size < numUniversities) {
      selectedUnis.add(Math.floor(Math.random() * 20) + 1);
    }
    
    for (const universityID of selectedUnis) {
      universityProgrammesData.push({
        universityID,
        programmeID,
        durationYears: (Math.floor(Math.random() * 3) + 3).toString() + ".0",
        minAGP: Math.floor(Math.random() * 10) + 6,
        helbEligible: true,
        scholarshipAvailable: Math.random() > 0.7,
      });
    }
  }

  // Insert in batches to avoid hitting query size limits
  const batchSize = 50;
  for (let i = 0; i < universityProgrammesData.length; i += batchSize) {
    const batch = universityProgrammesData.slice(i, i + batchSize);
    await db.insert(UniversityProgrammesTable).values(batch);
  }

  /* =============================
     APPLICATIONS
  ============================= */
  await db.insert(ApplicationsTable).values([
    { userID: 1, programmeID: 1, choiceOrder: 1, applicationDate: "2025-01-15", status: "Pending", clusterScore: "42.5" },
    { userID: 2, programmeID: 15, choiceOrder: 1, applicationDate: "2025-01-18", status: "Pending", clusterScore: "38.0" },
    { userID: 3, programmeID: 4, choiceOrder: 1, applicationDate: "2025-01-20", status: "Approved", clusterScore: "48.3" },
    { userID: 4, programmeID: 9, choiceOrder: 1, applicationDate: "2025-01-22", status: "Approved", clusterScore: "52.5" },
    { userID: 5, programmeID: 41, choiceOrder: 1, applicationDate: "2025-01-25", status: "Pending", clusterScore: "34.5" },
    { userID: 1, programmeID: 2, choiceOrder: 2, applicationDate: "2025-01-15", status: "Pending", clusterScore: "41.2" },
    { userID: 2, programmeID: 16, choiceOrder: 2, applicationDate: "2025-01-18", status: "Pending", clusterScore: "37.5" },
  ]);

  /* =============================
     PLACEMENTS
  ============================= */
  await db.insert(PlacementsTable).values([
    { userID: 1, programmeID: 1, placementStatus: "Provisional", placementDate: "2025-03-01" },
    { userID: 3, programmeID: 4, placementStatus: "Placed", placementDate: "2025-03-05" },
    { userID: 4, programmeID: 9, placementStatus: "Placed", placementDate: "2025-03-10" },
    { userID: 5, programmeID: 41, placementStatus: "Placed", placementDate: "2025-03-12" },
    { userID: 2, programmeID: 15, placementStatus: "Not Placed", placementDate: null },
  ]);

  /* =============================
     APPLICATION WINDOWS
  ============================= */
  await db.insert(ApplicationWindowsTable).values([
    { name: "2025 Main Intake", startDate: "2025-01-01", endDate: "2025-03-31", isActive: true },
    { name: "2025 September Intake", startDate: "2025-06-01", endDate: "2025-08-31", isActive: false },
    { name: "2024 Main Intake", startDate: "2024-01-01", endDate: "2024-03-31", isActive: false },
  ]);

  /* =============================
     NOTIFICATIONS
  ============================= */
  await db.insert(NotificationsTable).values([
    { userID: 1, userRole: "student", message: "Your application for BSc Computer Science is under review", isRead: false, createdAt: "2025-02-15" },
    { userID: 1, userRole: "student", message: "Provisional placement offered", isRead: true, createdAt: "2025-03-01" },
    { userID: 3, userRole: "student", message: "Congratulations! You have been placed for Electrical Engineering", isRead: true, createdAt: "2025-03-05" },
    { userID: 4, userRole: "student", message: "Medical school application approved", isRead: false, createdAt: "2025-02-28" },
    { userID: 7, userRole: "university_admin", message: "New applications received for review", isRead: false, createdAt: "2025-02-20" },
    { userID: 9, userRole: "system_admin", message: "System maintenance scheduled", isRead: true, createdAt: "2025-02-10" },
  ]);

  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  console.error("Error details:", err.message);
  process.exit(1);
});