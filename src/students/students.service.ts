import { eq, sql } from "drizzle-orm";
import db from "../Drizzle/db";
import { StudentsTable } from "../Drizzle/schema";

/* =============================
   CREATE A NEW STUDENT
============================= */
export const createStudentService = async (student: any) => {
  const [newStudent] = await db
    .insert(StudentsTable)
    .values(student)
    .returning();
  return newStudent;
};

/* =============================
   GET STUDENT BY EMAIL
============================= */
export const getStudentByEmailService = async (email: string) => {
  return await db.query.StudentsTable.findFirst({
    where: sql`${StudentsTable.email} = ${email}`,
  });
};

/* =============================
   GET ALL STUDENTS
============================= */
export const getAllStudentsService = async () => {
  return await db.query.StudentsTable.findMany();
};

/* =============================
   GET STUDENT BY ID
============================= */
export const getStudentByIdService = async (id: number) => {
  return await db.query.StudentsTable.findFirst({
    where: eq(StudentsTable.studentID, id),
  });
};

/* =============================
   UPDATE STUDENT BY ID
============================= */
export const updateStudentService = async (
  id: number,
  updates: Partial<any>
) => {
  await db
    .update(StudentsTable)
    .set(updates)
    .where(eq(StudentsTable.studentID, id));

  return "Student updated successfully";
};

/* =============================
   DELETE STUDENT BY ID
============================= */
export const deleteStudentService = async (id: number) => {
  await db
    .delete(StudentsTable)
    .where(eq(StudentsTable.studentID, id));

  return "Student deleted successfully";
};

/* =============================
   GET STUDENT WITH FULL PROFILE
   (KCSE + Applications + Placements)
============================= */
export const getStudentFullProfileService = async (studentID: number) => {
  return await db.query.StudentsTable.findFirst({
    where: eq(StudentsTable.studentID, studentID),
    with: {
      kcseResults: true,
      applications: {
        with: {
          programme: true,
        },
      },
      placements: {
        with: {
          programme: true,
        },
      },
    },
  });
};
