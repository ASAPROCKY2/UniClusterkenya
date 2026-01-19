CREATE TABLE "application_windows" (
	"windowID" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"isActive" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "applications" (
	"applicationID" serial PRIMARY KEY NOT NULL,
	"studentID" integer NOT NULL,
	"programmeID" integer NOT NULL,
	"choiceOrder" integer NOT NULL,
	"applicationDate" date NOT NULL,
	"status" varchar(50) DEFAULT 'Pending',
	"clusterScore" numeric(5, 2)
);
--> statement-breakpoint
CREATE TABLE "kcse_results" (
	"resultID" serial PRIMARY KEY NOT NULL,
	"studentID" integer NOT NULL,
	"subjectCode" varchar(10) NOT NULL,
	"subjectName" varchar(50) NOT NULL,
	"grade" varchar(2) NOT NULL,
	"points" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"notificationID" serial PRIMARY KEY NOT NULL,
	"userID" integer NOT NULL,
	"userRole" varchar(50) NOT NULL,
	"message" text NOT NULL,
	"isRead" boolean DEFAULT false,
	"createdAt" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "placements" (
	"placementID" serial PRIMARY KEY NOT NULL,
	"studentID" integer NOT NULL,
	"programmeID" integer NOT NULL,
	"placementStatus" varchar(50) DEFAULT 'Not Placed',
	"placementDate" date
);
--> statement-breakpoint
CREATE TABLE "programmes" (
	"programmeID" serial PRIMARY KEY NOT NULL,
	"universityID" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"level" varchar(50),
	"durationYears" numeric(2, 1),
	"minAGP" integer,
	"helbEligible" boolean DEFAULT false,
	"scholarshipAvailable" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "students" (
	"studentID" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phoneNumber" varchar(20),
	"gender" varchar(10) NOT NULL,
	"citizenship" varchar(50) NOT NULL,
	"highSchool" varchar(100) NOT NULL,
	"kcseIndex" varchar(20) NOT NULL,
	"meanGrade" varchar(2) NOT NULL,
	"agp" integer NOT NULL,
	"photoURL" text,
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "system_admins" (
	"adminID" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"passwordHash" text NOT NULL,
	"role" varchar(50) DEFAULT 'superadmin',
	CONSTRAINT "system_admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "universities" (
	"universityID" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(50) NOT NULL,
	"county" varchar(50),
	"logoURL" text,
	"governmentScholarship" boolean DEFAULT false,
	"helbEligible" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "university_admins" (
	"uniAdminID" serial PRIMARY KEY NOT NULL,
	"universityID" integer NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"passwordHash" text NOT NULL,
	"role" varchar(50) DEFAULT 'admin',
	CONSTRAINT "university_admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_studentID_students_studentID_fk" FOREIGN KEY ("studentID") REFERENCES "public"."students"("studentID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_programmeID_programmes_programmeID_fk" FOREIGN KEY ("programmeID") REFERENCES "public"."programmes"("programmeID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kcse_results" ADD CONSTRAINT "kcse_results_studentID_students_studentID_fk" FOREIGN KEY ("studentID") REFERENCES "public"."students"("studentID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placements" ADD CONSTRAINT "placements_studentID_students_studentID_fk" FOREIGN KEY ("studentID") REFERENCES "public"."students"("studentID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placements" ADD CONSTRAINT "placements_programmeID_programmes_programmeID_fk" FOREIGN KEY ("programmeID") REFERENCES "public"."programmes"("programmeID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programmes" ADD CONSTRAINT "programmes_universityID_universities_universityID_fk" FOREIGN KEY ("universityID") REFERENCES "public"."universities"("universityID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "university_admins" ADD CONSTRAINT "university_admins_universityID_universities_universityID_fk" FOREIGN KEY ("universityID") REFERENCES "public"."universities"("universityID") ON DELETE cascade ON UPDATE no action;