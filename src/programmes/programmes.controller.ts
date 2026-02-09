import { Request, Response } from "express";
import {
  createProgrammeService,
  getAllProgrammesService,
  getProgrammeByIdService,
  updateProgrammeService,
  deleteProgrammeService,
  getProgrammeLevelsService,
  getProgrammeClustersService,
  getProgrammesByLevelService,
  getProgrammesByClusterService,
  filterProgrammesService,
  getApplicationsForProgrammeService,
  getPlacementsForProgrammeService,
} from "./programmes.service";

/* =============================
   CREATE PROGRAMME
============================= */
export const createProgrammeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { clusterIDs, universityID, ...programme } = req.body;

    if (!universityID || !programme.name) {
      return res.status(400).json({
        message: "University ID and programme name are required.",
      });
    }

    const created = await createProgrammeService({
      programme,
      universityID, 
      clusterIDs,
    });

    res.status(201).json({
      message: "Programme created successfully",
      data: created,
    });
  } catch (error: any) {
    console.error("createProgrammeController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET ALL PROGRAMMES
============================= */
export const getAllProgrammesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const programmes = await getAllProgrammesService();
    res.status(200).json({ data: programmes });
  } catch (error: any) {
    console.error("getAllProgrammesController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   GET PROGRAMME BY ID
============================= */
export const getProgrammeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const programmeID = Number(req.params.id);
    if (isNaN(programmeID)) {
      return res.status(400).json({ message: "Invalid programme ID" });
    }

    const programme = await getProgrammeByIdService(programmeID);
    if (!programme) {
      return res.status(404).json({ message: "Programme not found" });
    }

    res.status(200).json({ data: programme });
  } catch (error: any) {
    console.error("getProgrammeByIdController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   UPDATE PROGRAMME
============================= */
export const updateProgrammeController = async (
  req: Request,
  res: Response
) => {
  try {
    const programmeID = Number(req.params.id);
    if (isNaN(programmeID)) {
      return res.status(400).json({ message: "Invalid programme ID" });
    }

    await updateProgrammeService(programmeID, req.body);

    res.status(200).json({
      message: "Programme updated successfully",
    });
  } catch (error: any) {
    console.error("updateProgrammeController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   DELETE PROGRAMME
============================= */
export const deleteProgrammeController = async (
  req: Request,
  res: Response
) => {
  try {
    const programmeID = Number(req.params.id);
    if (isNaN(programmeID)) {
      return res.status(400).json({ message: "Invalid programme ID" });
    }

    await deleteProgrammeService(programmeID);

    res.status(200).json({
      message: "Programme deleted successfully",
    });
  } catch (error: any) {
    console.error("deleteProgrammeController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   PROGRAMME LEVELS
============================= */
export const getProgrammeLevelsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const levels = await getProgrammeLevelsService();
    res.status(200).json({ data: levels });
  } catch (error: any) {
    console.error("getProgrammeLevelsController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   PROGRAMME CLUSTERS
============================= */
export const getProgrammeClustersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const clusters = await getProgrammeClustersService();
    res.status(200).json({ data: clusters });
  } catch (error: any) {
    console.error("getProgrammeClustersController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   PROGRAMMES BY LEVEL
============================= */
export const getProgrammesByLevelController = async (
  req: Request,
  res: Response
) => {
  try {
    const levelParam = req.params.level;
    const level =
      Array.isArray(levelParam) ? levelParam[0] : levelParam;

    if (!level) {
      return res.status(400).json({ message: "Programme level is required" });
    }

    const programmes = await getProgrammesByLevelService(level);
    res.status(200).json({ data: programmes });
  } catch (error: any) {
    console.error("getProgrammesByLevelController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   PROGRAMMES BY CLUSTER
============================= */
export const getProgrammesByClusterController = async (
  req: Request,
  res: Response
) => {
  try {
    const clusterID = Number(req.params.clusterID);
    if (isNaN(clusterID)) {
      return res.status(400).json({ message: "Invalid cluster ID" });
    }

    const programmes = await getProgrammesByClusterService(clusterID);
    res.status(200).json({ data: programmes });
  } catch (error: any) {
    console.error("getProgrammesByClusterController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   FILTER PROGRAMMES
============================= */
export const filterProgrammesController = async (
  req: Request,
  res: Response
) => {
  try {
    let level: string | undefined;
    const levelQuery = req.query.level;

    if (typeof levelQuery === "string") {
      level = levelQuery;
    } else if (Array.isArray(levelQuery) && typeof levelQuery[0] === "string") {
      level = levelQuery[0];
    }

    const universityID =
      typeof req.query.universityID === "string"
        ? Number(req.query.universityID)
        : undefined;

    const filters: {
      level?: string;
      universityID?: number;
    } = { level, universityID };

    const programmes = await filterProgrammesService(filters);
    res.status(200).json({ data: programmes });
  } catch (error: any) {
    console.error("filterProgrammesController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   APPLICATIONS FOR PROGRAMME
============================= */
export const getApplicationsForProgrammeController = async (
  req: Request,
  res: Response
) => {
  try {
    const programmeID = Number(req.params.id);
    if (isNaN(programmeID)) {
      return res.status(400).json({ message: "Invalid programme ID" });
    }

    const applications = await getApplicationsForProgrammeService(programmeID);
    res.status(200).json({ data: applications });
  } catch (error: any) {
    console.error("getApplicationsForProgrammeController:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =============================
   PLACEMENTS FOR PROGRAMME
============================= */
export const getPlacementsForProgrammeController = async (
  req: Request,
  res: Response
) => {
  try {
    const programmeID = Number(req.params.id);
    if (isNaN(programmeID)) {
      return res.status(400).json({ message: "Invalid programme ID" });
    }

    const placements = await getPlacementsForProgrammeService(programmeID);
    res.status(200).json({ data: placements });
  } catch (error: any) {
    console.error("getPlacementsForProgrammeController:", error);
    res.status(500).json({ error: error.message });
  }
};
