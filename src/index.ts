import express from "express";
import ProgrammesRoutes from "./programmes/programmes.router"; // Import programmes router
import UniversityRoutes from "./universities/universities.router"; // Import universities router
import KcseResultsRoutes from "./KcseResults/KcseResults.router"; // Import KCSE results router
import ApplicationsRoutes from "./studentsApplication/studentsApplication.router"; // Import applications router
import PlacementsRoutes from "./placements/placements.router"; // Import placements router
import ApplicationWindowsRoutes from "./applicationWindows/applicationWindows.router"; // Import application windows router

const app = express();
app.use(express.json()); // used to parse JSON bodies

// Root route
app.get("/", (req, res) => {
  res.send("🎓 UniCluster API is live");
});

// Register programmes routes
ProgrammesRoutes(app);

// Register universities routes
UniversityRoutes(app);

// Register KCSE results routes
KcseResultsRoutes(app);

// Register applications routes
ApplicationsRoutes(app);

// Register placements routes
PlacementsRoutes(app);

// Register application windows routes
ApplicationWindowsRoutes(app);

app.listen(5000, () => {
  console.log("🚀 UniCluster backend running on http://localhost:8081");
});
