CREATE TYPE "public"."role" AS ENUM('student', 'university_admin', 'system_admin');--> statement-breakpoint
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
	"userID" integer NOT NULL,
	"programmeID" integer NOT NULL,
	"clusterID" integer,
	"choiceOrder" integer NOT NULL,
	"applicationDate" date NOT NULL,
	"status" varchar(50) DEFAULT 'Pending',
	"clusterScore" numeric(5, 2)
);
--> statement-breakpoint
CREATE TABLE "kcse_results" (
	"resultID" serial PRIMARY KEY NOT NULL,
	"userID" integer NOT NULL,
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
	"userID" integer NOT NULL,
	"programmeID" integer NOT NULL,
	"placementStatus" varchar(50) DEFAULT 'Not Placed',
	"placementDate" date
);
--> statement-breakpoint
CREATE TABLE "programme_cluster_map" (
	"id" serial PRIMARY KEY NOT NULL,
	"programmeID" integer NOT NULL,
	"clusterID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programme_cluster_subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"clusterID" integer NOT NULL,
	"subjectCode" varchar(10) NOT NULL,
	"subjectName" varchar(50) NOT NULL,
	"minPoints" integer NOT NULL,
	"alternativeGroup" integer
);
--> statement-breakpoint
CREATE TABLE "programme_clusters" (
	"clusterID" serial PRIMARY KEY NOT NULL,
	"clusterCode" varchar(20) NOT NULL,
	"name" varchar(150) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programme_levels" (
	"levelID" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "programmes" (
	"programmeID" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"level" varchar(50)
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
CREATE TABLE "university_programmes" (
	"id" serial PRIMARY KEY NOT NULL,
	"universityID" integer NOT NULL,
	"programmeID" integer NOT NULL,
	"durationYears" numeric(2, 1),
	"minAGP" integer,
	"helbEligible" boolean DEFAULT false,
	"scholarshipAvailable" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "users" (
	"userID" serial PRIMARY KEY NOT NULL,
	"email" varchar(100) NOT NULL,
	"passwordHash" text NOT NULL,
	"role" "role" DEFAULT 'student',
	"isVerified" boolean DEFAULT false,
	"verificationCode" varchar(6),
	"verificationCodeExpiresAt" timestamp,
	"firstName" varchar(50),
	"lastName" varchar(50),
	"phoneNumber" varchar(20),
	"gender" varchar(10),
	"citizenship" varchar(50),
	"highSchool" varchar(100),
	"kcseIndex" varchar(20),
	"meanGrade" varchar(2),
	"agp" integer,
	"photoURL" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_userID_users_userID_fk" FOREIGN KEY ("userID") REFERENCES "public"."users"("userID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_programmeID_programmes_programmeID_fk" FOREIGN KEY ("programmeID") REFERENCES "public"."programmes"("programmeID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_clusterID_programme_clusters_clusterID_fk" FOREIGN KEY ("clusterID") REFERENCES "public"."programme_clusters"("clusterID") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kcse_results" ADD CONSTRAINT "kcse_results_userID_users_userID_fk" FOREIGN KEY ("userID") REFERENCES "public"."users"("userID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placements" ADD CONSTRAINT "placements_userID_users_userID_fk" FOREIGN KEY ("userID") REFERENCES "public"."users"("userID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placements" ADD CONSTRAINT "placements_programmeID_programmes_programmeID_fk" FOREIGN KEY ("programmeID") REFERENCES "public"."programmes"("programmeID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme_cluster_map" ADD CONSTRAINT "programme_cluster_map_programmeID_programmes_programmeID_fk" FOREIGN KEY ("programmeID") REFERENCES "public"."programmes"("programmeID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme_cluster_map" ADD CONSTRAINT "programme_cluster_map_clusterID_programme_clusters_clusterID_fk" FOREIGN KEY ("clusterID") REFERENCES "public"."programme_clusters"("clusterID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme_cluster_subjects" ADD CONSTRAINT "programme_cluster_subjects_clusterID_programme_clusters_clusterID_fk" FOREIGN KEY ("clusterID") REFERENCES "public"."programme_clusters"("clusterID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "university_programmes" ADD CONSTRAINT "university_programmes_universityID_universities_universityID_fk" FOREIGN KEY ("universityID") REFERENCES "public"."universities"("universityID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "university_programmes" ADD CONSTRAINT "university_programmes_programmeID_programmes_programmeID_fk" FOREIGN KEY ("programmeID") REFERENCES "public"."programmes"("programmeID") ON DELETE cascade ON UPDATE no action;