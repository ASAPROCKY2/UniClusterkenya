import express from "express";
import cors from "cors";

// =============================
// ROUTE IMPORTS
// =============================
import ProgrammesRoutes from "./programmes/programmes.router";
import UniversityRoutes from "./universities/universities.router";
import KcseResultsRoutes from "./KcseResults/KcseResults.router";
import ApplicationsRoutes from "./studentsApplication/studentsApplication.router";
import PlacementsRoutes from "./placements/placements.router";
import ApplicationWindowsRoutes from "./applicationWindows/applicationWindows.router";

import UniversityAdminsRoutes from "./UniversityAdmins/UniversityAdmins.router";
import SystemAdminsRoutes from "./systemAdmins/systemAdmins.router";
import NotificationsRoutes from "./notification/notification.router";
import UserRoutes from "./user/user.router";

// Cluster Subjects routes
import ClusterProgrammeRoutes from "./ClusterProgramme/ClusterProgram.router";

//  Dashboard routes
import DashboardRoutes from "./Dashboard/dashboard.router";

// =============================
// APP SETUP
// =============================
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// =============================
// ROOT ROUTE
// =============================
app.get("/", (_req, res) => {
  res.send("🎓 UniCluster API is live");
});

// =============================
// REGISTER ROUTES
// =============================
ProgrammesRoutes(app);
UniversityRoutes(app);
KcseResultsRoutes(app);
ApplicationsRoutes(app);
PlacementsRoutes(app);
ApplicationWindowsRoutes(app);

UniversityAdminsRoutes(app);
SystemAdminsRoutes(app);
NotificationsRoutes(app);
UserRoutes(app);

//  Register ClusterSubjects routes
app.use("/api/cluster-subjects", ClusterProgrammeRoutes);

//  Register Dashboard routes
DashboardRoutes(app);

// =============================
// SERVER
// =============================
const PORT = 8081;

app.listen(PORT, () => {
  console.log(` UniCluster backend running on http://localhost:${PORT}`);
});

export default app;
