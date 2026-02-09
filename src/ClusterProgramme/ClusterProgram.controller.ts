// src/programmes/clusterProgramme.controller.ts
import { Request, Response } from "express";
import {
  createClusterSubjectsService,
  getClusterSubjectsByClusterService,
  getClusterSubjectByIdService,
  updateClusterSubjectService,
  deleteClusterSubjectService,
} from "./ClusterProgram.service";

/* =============================
   CREATE CLUSTER SUBJECT(S)
============================= */
export const createClusterSubjectsController = async (req: Request, res: Response) => {
  try {
    const { clusterID, subjects } = req.body;

    if (!clusterID || !subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ message: "clusterID and subjects array are required" });
    }

    const newSubjects = await createClusterSubjectsService({ clusterID, subjects });
    res.status(201).json({ message: "Cluster subjects created successfully", data: newSubjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create cluster subjects", error });
  }
};

/* =============================
   GET ALL SUBJECTS FOR A CLUSTER
============================= */
export const getClusterSubjectsByClusterController = async (req: Request, res: Response) => {
  try {
    const clusterID = Number(req.params.clusterID);
    if (!clusterID) return res.status(400).json({ message: "clusterID is required" });

    const subjects = await getClusterSubjectsByClusterService(clusterID);
    res.status(200).json({ data: subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cluster subjects", error });
  }
};

/* =============================
   GET SINGLE CLUSTER SUBJECT
============================= */
export const getClusterSubjectByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Subject ID is required" });

    const subject = await getClusterSubjectByIdService(id);
    if (!subject) return res.status(404).json({ message: "Cluster subject not found" });

    res.status(200).json({ data: subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cluster subject", error });
  }
};

/* =============================
   UPDATE CLUSTER SUBJECT
============================= */
export const updateClusterSubjectController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updates = req.body;

    if (!id || !updates) return res.status(400).json({ message: "ID and update data are required" });

    const result = await updateClusterSubjectService(id, updates);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cluster subject", error });
  }
};

/* =============================
   DELETE CLUSTER SUBJECT
============================= */
export const deleteClusterSubjectController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Subject ID is required" });

    const result = await deleteClusterSubjectService(id);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete cluster subject", error });
  }
};
