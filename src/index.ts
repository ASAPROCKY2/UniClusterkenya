import express from "express";

// =============================
// ROUTE IMPORTS
// =============================
import ProgrammesRoutes from "./programmes/programmes.router";
import UniversityRoutes from "./universities/universities.router";
import KcseResultsRoutes from "./KcseResults/KcseResults.router";
import ApplicationsRoutes from "./studentsApplication/studentsApplication.router";
import PlacementsRoutes from "./placements/placements.router";
import ApplicationWindowsRoutes from "./applicationWindows/applicationWindows.router";

// 🔹 NEW ROUTES
import StudentsRoutes from "./students/students.router";
import UniversityAdminsRoutes from "./UniversityAdmins/UniversityAdmins.router";
import SystemAdminsRoutes from "./systemAdmins/systemAdmins.router";

// =============================
// APP SETUP
// =============================
const app = express();
app.use(express.json());

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

// 🔹 Newly added
StudentsRoutes(app);
UniversityAdminsRoutes(app);
SystemAdminsRoutes(app);

// =============================
// SERVER
// =============================
const PORT = 8081;

app.listen(PORT, () => {
  console.log(`🚀 UniCluster backend running on http://localhost:${PORT}`);
});

export default app;
