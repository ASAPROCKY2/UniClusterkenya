// src/programmes/clusterProgramme.router.ts
import { Router } from "express";
import {
  createClusterSubjectsController,
  getClusterSubjectsByClusterController,
  getClusterSubjectByIdController,
  updateClusterSubjectController,
  deleteClusterSubjectController,
} from "./ClusterProgram.controller";

const router = Router();


// Create one or more cluster subjects
router.post("/", createClusterSubjectsController);

// Get all subjects for a specific cluster
router.get("/cluster/:clusterID", getClusterSubjectsByClusterController);

// Get a single cluster subject by ID
router.get("/:id", getClusterSubjectByIdController);

// Update a cluster subject by ID
router.put("/:id", updateClusterSubjectController);

// Delete a cluster subject by ID
router.delete("/:id", deleteClusterSubjectController);

export default router;
