import db from "./db";
import {
    StudentsTable,
    KcseResultsTable,
    UniversitiesTable,
    ProgrammesTable,
    ApplicationsTable,
    PlacementsTable,
    ApplicationWindowsTable,
    NotificationsTable,
    SystemAdminsTable,
    UniversityAdminsTable
} from "./schema";

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
        { name: "Mount Kenya University", type: "Private", county: "Thika", governmentScholarship: false, helbEligible: true }
    ]);

    // =============================
    // PROGRAMMES
    // =============================
    await db.insert(ProgrammesTable).values([
        { universityID: 1, name: "Computer Science", level: "Bachelor", durationYears: "4.0", minAGP: 12, helbEligible: true, scholarshipAvailable: true },
        { universityID: 2, name: "Business Management", level: "Bachelor", durationYears: "4.0", minAGP: 10, helbEligible: true, scholarshipAvailable: false },
        { universityID: 3, name: "Mechanical Engineering", level: "Diploma", durationYears: "2.0", minAGP: 8, helbEligible: false, scholarshipAvailable: true },
        { universityID: 4, name: "Law", level: "Bachelor", durationYears: "4.0", minAGP: 11, helbEligible: true, scholarshipAvailable: true },
        { universityID: 5, name: "Education", level: "Diploma", durationYears: "2.0", minAGP: 9, helbEligible: false, scholarshipAvailable: false },
        { universityID: 6, name: "Agriculture", level: "Bachelor", durationYears: "4.0", minAGP: 10, helbEligible: true, scholarshipAvailable: true }
    ]);

    // =============================
    // STUDENTS
    // =============================
    await db.insert(StudentsTable).values([
        { firstName: "John", lastName: "Doe", email: "john@example.com", phoneNumber: "0712345678", gender: "Male", citizenship: "Kenyan", highSchool: "Nairobi High", kcseIndex: "A12345", meanGrade: "A", agp: 12, photoURL: "" },
        { firstName: "Jane", lastName: "Smith", email: "jane@example.com", phoneNumber: "0723456789", gender: "Female", citizenship: "Kenyan", highSchool: "Kisumu Girls", kcseIndex: "B12345", meanGrade: "B", agp: 10, photoURL: "" },
        { firstName: "Alice", lastName: "Wanjiku", email: "alice@example.com", phoneNumber: "0734567890", gender: "Female", citizenship: "Kenyan", highSchool: "Eldoret High", kcseIndex: "C12345", meanGrade: "B", agp: 11, photoURL: "" },
        { firstName: "Bob", lastName: "Otieno", email: "bob@example.com", phoneNumber: "0745678901", gender: "Male", citizenship: "Kenyan", highSchool: "Mombasa High", kcseIndex: "D12345", meanGrade: "C", agp: 9, photoURL: "" },
        { firstName: "Charlie", lastName: "Kamau", email: "charlie@example.com", phoneNumber: "0756789012", gender: "Male", citizenship: "Kenyan", highSchool: "Nakuru Boys", kcseIndex: "E12345", meanGrade: "A", agp: 12, photoURL: "" },
        { firstName: "Diana", lastName: "Njeri", email: "diana@example.com", phoneNumber: "0767890123", gender: "Female", citizenship: "Kenyan", highSchool: "Mount Kenya High", kcseIndex: "F12345", meanGrade: "B", agp: 11, photoURL: "" }
    ]);

    // =============================
    // KCSE RESULTS
    // =============================
    await db.insert(KcseResultsTable).values([
        { studentID: 1, subjectCode: "ENG", subjectName: "English", grade: "A", points: 12 },
        { studentID: 1, subjectCode: "MAT", subjectName: "Mathematics", grade: "A", points: 12 },
        { studentID: 2, subjectCode: "ENG", subjectName: "English", grade: "B", points: 10 },
        { studentID: 2, subjectCode: "MAT", subjectName: "Mathematics", grade: "B", points: 10 },
        { studentID: 3, subjectCode: "ENG", subjectName: "English", grade: "B", points: 11 },
        { studentID: 3, subjectCode: "MAT", subjectName: "Mathematics", grade: "A", points: 12 }
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
        { name: "Semester 6", startDate: "2027-09-01", endDate: "2027-09-30", isActive: false }
    ]);

    // =============================
    // SYSTEM ADMINS
    // =============================
    await db.insert(SystemAdminsTable).values([
        { firstName: "Admin", lastName: "One", email: "admin1@example.com", passwordHash: "hashedpassword1" },
        { firstName: "Admin", lastName: "Two", email: "admin2@example.com", passwordHash: "hashedpassword2" },
        { firstName: "Admin", lastName: "Three", email: "admin3@example.com", passwordHash: "hashedpassword3" },
        { firstName: "Admin", lastName: "Four", email: "admin4@example.com", passwordHash: "hashedpassword4" },
        { firstName: "Admin", lastName: "Five", email: "admin5@example.com", passwordHash: "hashedpassword5" },
        { firstName: "Admin", lastName: "Six", email: "admin6@example.com", passwordHash: "hashedpassword6" }
    ]);

    // =============================
    // UNIVERSITY ADMINS
    // =============================
    await db.insert(UniversityAdminsTable).values([
        { universityID: 1, firstName: "UniAdmin1", lastName: "A", email: "unia1@example.com", passwordHash: "pass1" },
        { universityID: 2, firstName: "UniAdmin2", lastName: "B", email: "unia2@example.com", passwordHash: "pass2" },
        { universityID: 3, firstName: "UniAdmin3", lastName: "C", email: "unia3@example.com", passwordHash: "pass3" },
        { universityID: 4, firstName: "UniAdmin4", lastName: "D", email: "unia4@example.com", passwordHash: "pass4" },
        { universityID: 5, firstName: "UniAdmin5", lastName: "E", email: "unia5@example.com", passwordHash: "pass5" },
        { universityID: 6, firstName: "UniAdmin6", lastName: "F", email: "unia6@example.com", passwordHash: "pass6" }
    ]);

    // =============================
    // APPLICATIONS (student applications)
    // =============================
    await db.insert(ApplicationsTable).values([
        { studentID: 1, programmeID: 1, choiceOrder: 1, applicationDate: "2026-01-05", status: "Pending", clusterScore: "90.00" },
        { studentID: 2, programmeID: 2, choiceOrder: 1, applicationDate: "2026-01-06", status: "Pending", clusterScore: "85.50" },
        { studentID: 3, programmeID: 3, choiceOrder: 1, applicationDate: "2026-01-07", status: "Pending", clusterScore: "88.00" },
        { studentID: 4, programmeID: 4, choiceOrder: 1, applicationDate: "2026-01-08", status: "Pending", clusterScore: "92.50" },
        { studentID: 5, programmeID: 5, choiceOrder: 1, applicationDate: "2026-01-09", status: "Pending", clusterScore: "80.00" },
        { studentID: 6, programmeID: 6, choiceOrder: 1, applicationDate: "2026-01-10", status: "Pending", clusterScore: "89.75" }
    ]);

    // =============================
    // PLACEMENTS
    // =============================
    await db.insert(PlacementsTable).values([
        { studentID: 1, programmeID: 1, placementStatus: "Placed", placementDate: "2026-02-01" },
        { studentID: 2, programmeID: 2, placementStatus: "Placed", placementDate: "2026-02-02" },
        { studentID: 3, programmeID: 3, placementStatus: "Not Placed", placementDate: "2026-02-03" },
        { studentID: 4, programmeID: 4, placementStatus: "Placed", placementDate: "2026-02-04" },
        { studentID: 5, programmeID: 5, placementStatus: "Not Placed", placementDate: "2026-02-05" },
        { studentID: 6, programmeID: 6, placementStatus: "Placed", placementDate: "2026-02-06" }
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
        { userID: 6, userRole: "student", message: "New programme available.", isRead: false, createdAt: "2026-01-06" }
    ]);

    console.log("Seeding database completed successfully.");
    process.exit(0);
}

seed().catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
});
