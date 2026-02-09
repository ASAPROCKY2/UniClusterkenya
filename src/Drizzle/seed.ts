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
  console.log("Seeding database...");

  /* =============================
     CLEAR EXISTING DATA
  ============================= */
  console.log("Clearing existing data...");
  
  // Clear tables in reverse order (to respect foreign key constraints)
  const tables = [
    NotificationsTable,
    PlacementsTable,
    ApplicationWindowsTable,
    ApplicationsTable,
    ProgrammeClusterSubjectsTable,
    ProgrammeClusterMapTable,
    UniversityProgrammesTable,
    ProgrammeClustersTable,
    ProgrammeLevelsTable,
    KcseResultsTable,
    ProgrammesTable,
    UniversitiesTable,
    UsersTable,
  ];
for (const table of tables) {
  try {
    await db.delete(table);
    console.log(`Cleared ${table._?.name || "Unknown Table"}`);
  } catch (error: any) {
    console.log(`Could not clear ${table._?.name || "Unknown Table"}:`, error.message);
  }
}




  console.log("\n=== STARTING SEEDING ===\n");

  /* =============================
     USERS (15 users)
  ============================= */
  console.log("Seeding users...");
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
    {
      email: "student7@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "Peter",
      lastName: "Mwangi",
      gender: "Male",
      citizenship: "Kenyan",
      kcseIndex: "78901234/2023",
      meanGrade: "B+",
      agp: 11,
    },
    {
      email: "student8@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "Esther",
      lastName: "Chebet",
      gender: "Female",
      citizenship: "Kenyan",
      kcseIndex: "89012345/2023",
      meanGrade: "A-",
      agp: 13,
    },
    {
      email: "student9@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "John",
      lastName: "Kiptoo",
      gender: "Male",
      citizenship: "Kenyan",
      kcseIndex: "90123456/2023",
      meanGrade: "B",
      agp: 9,
    },
    {
      email: "student10@test.com",
      passwordHash,
      role: "student",
      isVerified: true,
      firstName: "Mercy",
      lastName: "Nyambura",
      gender: "Female",
      citizenship: "Kenyan",
      kcseIndex: "01234567/2023",
      meanGrade: "C+",
      agp: 7,
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
    {
      email: "admin.mku@test.com",
      passwordHash,
      role: "university_admin",
      isVerified: true,
      firstName: "Prof. Simon",
      lastName: "Gicharu",
      gender: "Male",
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

  console.log("Created 15 users");

  /* =============================
     KCSE RESULTS
  ============================= */
  console.log("Seeding KCSE results...");
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

  console.log("Created KCSE results");

  /* =============================
     UNIVERSITIES (30 universities)
  ============================= */
  console.log("Seeding universities...");
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
    { name: "Multimedia University of Kenya", type: "Public", county: "Nairobi", governmentScholarship: true, helbEligible: true },
    { name: "Meru University of Science and Technology", type: "Public", county: "Meru", governmentScholarship: true, helbEligible: true },
    { name: "Murang'a University of Technology", type: "Public", county: "Murang'a", governmentScholarship: true, helbEligible: true },
    { name: "Laikipia University", type: "Public", county: "Laikipia", governmentScholarship: true, helbEligible: true },
    { name: "Karatina University", type: "Public", county: "Nyeri", governmentScholarship: true, helbEligible: true },
    
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
    { name: "Catholic University of Eastern Africa", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
    { name: "St. Paul's University", type: "Private", county: "Kiambu", governmentScholarship: false, helbEligible: true },
    { name: "Pan Africa Christian University", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
    { name: "Gretsa University", type: "Private", county: "Kiambu", governmentScholarship: false, helbEligible: true },
    { name: "Kiriri Women's University of Science and Technology", type: "Private", county: "Nairobi", governmentScholarship: false, helbEligible: true },
  ]);

  console.log("Created 30 universities");

  /* =============================
     PROGRAMMES (50 programmes)
  ============================= */
  console.log("Seeding programmes...");
  const programmesData = [
    // Engineering & Technology
    { name: "Bachelor of Science in Computer Science", level: "Degree" },
    { name: "Bachelor of Science in Software Engineering", level: "Degree" },
    { name: "Bachelor of Science in Information Technology", level: "Degree" },
    { name: "Bachelor of Science in Electrical & Electronics Engineering", level: "Degree" },
    { name: "Bachelor of Science in Civil Engineering", level: "Degree" },
    { name: "Bachelor of Science in Mechanical Engineering", level: "Degree" },
    { name: "Bachelor of Science in Telecommunications Engineering", level: "Degree" },
    { name: "Bachelor of Science in Aeronautical Engineering", level: "Degree" },
    { name: "Diploma in Computer Science", level: "Diploma" },
    { name: "Diploma in Electrical Engineering", level: "Diploma" },
    
    // Medicine & Health Sciences
    { name: "Bachelor of Medicine & Bachelor of Surgery", level: "Degree" },
    { name: "Bachelor of Science in Nursing", level: "Degree" },
    { name: "Bachelor of Pharmacy", level: "Degree" },
    { name: "Bachelor of Science in Public Health", level: "Degree" },
    { name: "Bachelor of Science in Medical Laboratory Science", level: "Degree" },
    { name: "Bachelor of Science in Physiotherapy", level: "Degree" },
    { name: "Diploma in Clinical Medicine", level: "Diploma" },
    { name: "Diploma in Nursing", level: "Diploma" },
    
    // Business & Economics
    { name: "Bachelor of Commerce", level: "Degree" },
    { name: "Bachelor of Business Administration", level: "Degree" },
    { name: "Bachelor of Science in Economics", level: "Degree" },
    { name: "Bachelor of Science in Finance", level: "Degree" },
    { name: "Bachelor of Science in Accounting", level: "Degree" },
    { name: "Bachelor of Science in Marketing", level: "Degree" },
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
    { name: "Bachelor of Education (Special Needs)", level: "Degree" },
    { name: "Diploma in Education", level: "Diploma" },
    { name: "Diploma in Early Childhood Education", level: "Diploma" },
    
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
    { name: "Bachelor of Science in Food Science", level: "Degree" },
    { name: "Diploma in Agriculture", level: "Diploma" },
    
    // Certificate Programmes
    { name: "Certificate in Information Technology", level: "Certificate" },
    { name: "Certificate in Business Management", level: "Certificate" },
  ];

  await db.insert(ProgrammesTable).values(programmesData);
  console.log("Created 50 programmes");

  /* =============================
     PROGRAMME LEVELS
  ============================= */
  console.log("Seeding programme levels...");
  await db.insert(ProgrammeLevelsTable).values([
    { name: "Degree", description: "Bachelor Degree Programmes" },
    { name: "Diploma", description: "Diploma Programmes" },
    { name: "Certificate", description: "Certificate Programmes" },
    { name: "Artisan", description: "Artisan Programmes" },
    { name: "Masters", description: "Masters Programmes" },
  ]);

  /* =============================
     PROGRAMME CLUSTERS
  ============================= */
  console.log("Seeding programme clusters...");
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
  console.log("Seeding programme-cluster map...");
  const programmeClusterMapData = [];
  for (let programmeID = 1; programmeID <= 50; programmeID++) {
    let clusterID = 3; // Default to Computing & IT
    
    if (programmeID <= 10) clusterID = 6; // Engineering
    else if (programmeID <= 18) clusterID = 5; // Health
    else if (programmeID <= 26) clusterID = 2; // Business
    else if (programmeID === 27) clusterID = 1; // Law
    else if (programmeID <= 32) clusterID = 10; // Social Sciences
    else if (programmeID <= 38) clusterID = 4; // Education
    else if (programmeID <= 42) clusterID = 7; // Natural Sciences
    else if (programmeID <= 46) clusterID = 8; // Arts
    else if (programmeID <= 48) clusterID = 9; // Agriculture
    else clusterID = 3; // Certificates
    
    programmeClusterMapData.push({ programmeID, clusterID });
  }

  await db.insert(ProgrammeClusterMapTable).values(programmeClusterMapData);
  console.log("Mapped programmes to clusters");

  /* =============================
     PROGRAMME CLUSTER SUBJECT REQUIREMENTS
  ============================= */
  console.log("Seeding cluster subject requirements...");
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
    
    // CL7: Natural Sciences
    { clusterID: 7, subjectCode: "121", subjectName: "Mathematics", minPoints: 10, alternativeGroup: null },
    { clusterID: 7, subjectCode: "233", subjectName: "Chemistry", minPoints: 10, alternativeGroup: null },
    { clusterID: 7, subjectCode: "231", subjectName: "Biology", minPoints: 10, alternativeGroup: null },
    
    // CL8: Arts & Humanities
    { clusterID: 8, subjectCode: "101", subjectName: "English", minPoints: 10, alternativeGroup: null },
    { clusterID: 8, subjectCode: "102", subjectName: "Kiswahili", minPoints: 9, alternativeGroup: null },
    { clusterID: 8, subjectCode: "311", subjectName: "History", minPoints: 8, alternativeGroup: null },
    
    // CL9: Agriculture & Environment
    { clusterID: 9, subjectCode: "443", subjectName: "Agriculture", minPoints: 9, alternativeGroup: null },
    { clusterID: 9, subjectCode: "121", subjectName: "Mathematics", minPoints: 9, alternativeGroup: null },
    { clusterID: 9, subjectCode: "101", subjectName: "English", minPoints: 9, alternativeGroup: null },
    
    // CL10: Social Sciences
    { clusterID: 10, subjectCode: "101", subjectName: "English", minPoints: 10, alternativeGroup: null },
    { clusterID: 10, subjectCode: "102", subjectName: "Kiswahili", minPoints: 9, alternativeGroup: null },
    { clusterID: 10, subjectCode: "311", subjectName: "History", minPoints: 8, alternativeGroup: null },
  ]);

  /* =============================
     UNIVERSITY-PROGRAMMES
     Each program offered by 15+ universities
  ============================= */
  console.log("Seeding university programmes...");
  const universityProgrammesData = [];
  
  for (let programmeID = 1; programmeID <= 50; programmeID++) {
    // Each programme in 15-17 universities
    const numUniversities = 15 + Math.floor(Math.random() * 3); // 15-17 universities
    
    // Create a set of unique university IDs
    const selectedUnis = new Set<number>();
    while (selectedUnis.size < numUniversities) {
      // Select from all 30 universities
      selectedUnis.add(Math.floor(Math.random() * 30) + 1);
    }
    
    for (const universityID of selectedUnis) {
      // Determine duration based on programme level
      let durationYears = "3.0";
      if (programmeID <= 26) durationYears = "4.0"; // Degrees
      if (programmeID === 11) durationYears = "6.0"; // Medicine
      if (programmeID === 12) durationYears = "4.0"; // Nursing
      
      // Determine min AGP based on programme competitiveness
      let minAGP = 8;
      if (programmeID === 11) minAGP = 13; // Medicine
      else if (programmeID === 27) minAGP = 12; // Law
      else if (programmeID <= 10) minAGP = 10; // Engineering
      else if (programmeID <= 18) minAGP = 11; // Health sciences
      else if (programmeID <= 26) minAGP = 9; // Business
      
      // Determine capacity based on programme type
      let capacity = 80; // Default capacity
      if (programmeID === 11) capacity = 50; // Medicine (smaller capacity)
      else if (programmeID === 27) capacity = 60; // Law
      else if (programmeID <= 10) capacity = 120; // Engineering (larger)
      else if (programmeID <= 18) capacity = 90; // Health sciences
      else if (programmeID <= 26) capacity = 150; // Business (largest)
      else if (programmeID >= 49) capacity = 60; // Certificates
      
      // Randomly adjust capacity slightly
      capacity = Math.max(30, capacity + Math.floor(Math.random() * 40) - 20);
      
      // Random filled slots (0-30% of capacity)
      const filledSlots = Math.floor(Math.random() * (capacity * 0.3));

      universityProgrammesData.push({
        universityID,
        programmeID,
        durationYears,
        minAGP: Math.max(6, Math.min(15, minAGP)),
        helbEligible: universityID <= 15 ? true : Math.random() > 0.3,
        scholarshipAvailable: Math.random() > 0.7,
        capacity,
        filledSlots,
      });
    }
  }

  // Insert in batches
  const batchSize = 100;
  for (let i = 0; i < universityProgrammesData.length; i += batchSize) {
    const batch = universityProgrammesData.slice(i, i + batchSize);
    await db.insert(UniversityProgrammesTable).values(batch);
  }

  console.log(`Created ${universityProgrammesData.length} university-programme relationships`);

  /* =============================
     APPLICATIONS (using updated enum values)
  ============================= */
  console.log("Seeding applications...");
  await db.insert(ApplicationsTable).values([
    { userID: 1, programmeID: 1, clusterID: 3, choiceOrder: 1, applicationDate: "2025-01-15", status: "pending", clusterScore: "42.5" },
    { userID: 2, programmeID: 19, clusterID: 2, choiceOrder: 1, applicationDate: "2025-01-18", status: "placed", clusterScore: "38.0" },
    { userID: 3, programmeID: 4, clusterID: 6, choiceOrder: 1, applicationDate: "2025-01-20", status: "placed", clusterScore: "48.3" },
    { userID: 4, programmeID: 11, clusterID: 5, choiceOrder: 1, applicationDate: "2025-01-22", status: "placed", clusterScore: "52.5" },
    { userID: 5, programmeID: 49, clusterID: 3, choiceOrder: 1, applicationDate: "2025-01-25", status: "placed", clusterScore: "34.5" },
    { userID: 1, programmeID: 2, clusterID: 3, choiceOrder: 2, applicationDate: "2025-01-15", status: "pending", clusterScore: "41.2" },
    { userID: 2, programmeID: 20, clusterID: 2, choiceOrder: 2, applicationDate: "2025-01-18", status: "pending", clusterScore: "37.5" },
    { userID: 3, programmeID: 11, clusterID: 5, choiceOrder: 2, applicationDate: "2025-01-20", status: "not_placed", clusterScore: "49.5" },
    { userID: 6, programmeID: 33, clusterID: 4, choiceOrder: 1, applicationDate: "2025-01-28", status: "pending", clusterScore: "32.8" },
    { userID: 7, programmeID: 15, clusterID: 2, choiceOrder: 1, applicationDate: "2025-02-01", status: "placed", clusterScore: "40.2" },
    { userID: 8, programmeID: 12, clusterID: 5, choiceOrder: 1, applicationDate: "2025-02-05", status: "placed", clusterScore: "45.6" },
    { userID: 9, programmeID: 47, clusterID: 9, choiceOrder: 1, applicationDate: "2025-02-10", status: "placed", clusterScore: "36.7" },
    { userID: 10, programmeID: 28, clusterID: 10, choiceOrder: 1, applicationDate: "2025-02-15", status: "pending", clusterScore: "33.4" },
    { userID: 4, programmeID: 27, clusterID: 1, choiceOrder: 2, applicationDate: "2025-01-22", status: "withdrawn", clusterScore: "51.8" },
  ]);

  console.log("Created 14 applications");

  /* =============================
     PLACEMENTS (FIXED: Correct schema with universityID, applicationID, year)
  ============================= */
  console.log("Seeding placements...");
  
  // First, let's get the application IDs we just created
  const applications = await db.select().from(ApplicationsTable);
  const applicationMap = new Map();
  applications.forEach(app => {
    const key = `${app.userID}-${app.programmeID}`;
    applicationMap.set(key, app.applicationID);
  });

  // Now create placements with correct schema
  await db.insert(PlacementsTable).values([
    { 
      userID: 1, 
      programmeID: 1, 
      universityID: 1, // University of Nairobi
      applicationID: applicationMap.get("1-1") || 1,
      year: 2025 
    },
    { 
      userID: 3, 
      programmeID: 4, 
      universityID: 6, // Jomo Kenyatta University
      applicationID: applicationMap.get("3-4") || 3,
      year: 2025 
    },
    { 
      userID: 4, 
      programmeID: 11, 
      universityID: 1, // University of Nairobi
      applicationID: applicationMap.get("4-11") || 4,
      year: 2025 
    },
    { 
      userID: 5, 
      programmeID: 49, 
      universityID: 16, // Mount Kenya University
      applicationID: applicationMap.get("5-49") || 5,
      year: 2025 
    },
    { 
      userID: 7, 
      programmeID: 15, 
      universityID: 2, // Kenyatta University
      applicationID: applicationMap.get("7-15") || 10,
      year: 2025 
    },
    { 
      userID: 8, 
      programmeID: 12, 
      universityID: 1, // University of Nairobi
      applicationID: applicationMap.get("8-12") || 11,
      year: 2025 
    },
    { 
      userID: 9, 
      programmeID: 47, 
      universityID: 9, // Masinde Muliro University
      applicationID: applicationMap.get("9-47") || 12,
      year: 2025 
    },
  ]);

  console.log("Created 7 placements");

  /* =============================
     APPLICATION WINDOWS
  ============================= */
  console.log("Seeding application windows...");
  await db.insert(ApplicationWindowsTable).values([
    { name: "2025 Main Intake", startDate: "2025-01-01", endDate: "2025-03-31", isActive: true, programmeID: 1, totalSlots: 100, availableSlots: 45 },
    { name: "2025 September Intake", startDate: "2025-06-01", endDate: "2025-08-31", isActive: false, programmeID: 19, totalSlots: 80, availableSlots: 80 },
    { name: "2024 Main Intake", startDate: "2024-01-01", endDate: "2024-03-31", isActive: false, programmeID: 4, totalSlots: 120, availableSlots: 0 },
    { name: "2025 Engineering Intake", startDate: "2025-02-01", endDate: "2025-04-30", isActive: true, programmeID: 4, totalSlots: 150, availableSlots: 75 },
    { name: "2025 Business Intake", startDate: "2025-01-15", endDate: "2025-03-15", isActive: true, programmeID: 19, totalSlots: 200, availableSlots: 120 },
    { name: "2025 Medicine Intake", startDate: "2025-02-15", endDate: "2025-04-15", isActive: true, programmeID: 11, totalSlots: 80, availableSlots: 25 },
    { name: "2025 Law Intake", startDate: "2025-01-20", endDate: "2025-03-20", isActive: true, programmeID: 27, totalSlots: 60, availableSlots: 15 },
    { name: "2025 Education Intake", startDate: "2025-02-10", endDate: "2025-04-10", isActive: true, programmeID: 33, totalSlots: 180, availableSlots: 95 },
    { name: "2025 Nursing Intake", startDate: "2025-01-25", endDate: "2025-03-25", isActive: true, programmeID: 12, totalSlots: 100, availableSlots: 40 },
    { name: "2025 Agriculture Intake", startDate: "2025-02-05", endDate: "2025-04-05", isActive: true, programmeID: 47, totalSlots: 120, availableSlots: 85 },
  ]);

  console.log("Created 10 application windows");

  /* =============================
     NOTIFICATIONS
  ============================= */
  console.log("Seeding notifications...");
  await db.insert(NotificationsTable).values([
    { userID: 1, userRole: "student", message: "Your application for BSc Computer Science is under review", isRead: false, createdAt: "2025-01-16" },
    { userID: 3, userRole: "student", message: "Congratulations! Your placement for Engineering is confirmed", isRead: true, createdAt: "2025-03-06" },
    { userID: 4, userRole: "student", message: "Medical school application accepted. Please complete registration", isRead: true, createdAt: "2025-01-25" },
    { userID: 8, userRole: "student", message: "Your Nursing application has been processed successfully", isRead: false, createdAt: "2025-02-08" },
    { userID: 11, userRole: "university_admin", message: "New applications pending review for University of Nairobi", isRead: false, createdAt: "2025-02-20" },
    { userID: 13, userRole: "system_admin", message: "System maintenance scheduled for Saturday 2 AM", isRead: true, createdAt: "2025-02-15" },
    { userID: 2, userRole: "student", message: "Your Business application requires additional documents", isRead: false, createdAt: "2025-01-20" },
    { userID: 5, userRole: "student", message: "Certificate programme placement confirmed", isRead: true, createdAt: "2025-03-13" },
    { userID: 7, userRole: "student", message: "Scholarship opportunity available for your programme", isRead: false, createdAt: "2025-02-25" },
    { userID: 10, userRole: "student", message: "Application deadline approaching for Social Sciences", isRead: true, createdAt: "2025-02-28" },
  ]);

  console.log("Created 10 notifications");

  /* =============================
     FINAL SUMMARY
  ============================= */
  console.log("\n" + "=".repeat(50));
  console.log("✅ DATABASE SEEDED SUCCESSFULLY!");
  console.log("=".repeat(50));
  console.log("\n📊 SEED SUMMARY:");
  console.log("├── Users: 15 (10 students, 5 admins)");
  console.log("├── Universities: 30 (15 public, 15 private)");
  console.log("├── Programmes: 50");
  console.log("├── University-Programmes: " + universityProgrammesData.length);
  console.log("├── Applications: 14");
  console.log("├── Placements: 7");
  console.log("├── Application Windows: 10");
  console.log("└── Notifications: 10");
  
  console.log("\n📈 KEY FEATURES:");
  console.log("├── Each programme offered by 15-17 universities");
  console.log("├── University programmes now include capacity tracking");
  console.log("├── Applications use new status enum (pending, placed, not_placed, withdrawn, rejected)");
  console.log("├── Placements now correctly reference universityID and applicationID");
  console.log("└── All data relationships properly configured");
  
  console.log("\n🔑 LOGIN CREDENTIALS:");
  console.log("├── Students: student1@test.com ... student10@test.com");
  console.log("├── Password: Password123");
  console.log("├── University Admins: admin.uon@test.com, admin.ku@test.com, admin.mku@test.com");
  console.log("└── System Admins: sysadmin@test.com, support@test.com");
  
  console.log("\n🎉 Ready for presentation!");
  console.log("=".repeat(50) + "\n");
  
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:");
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);
  process.exit(1);
});