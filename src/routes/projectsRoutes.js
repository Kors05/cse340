
import express from "express";

import {
  getProjects,
  getProjectDetails,
} from "../controllers/projectsController.js";

const router = express.Router();

// Display the next five upcoming service projects
router.get("/projects", getProjects);

// Display an individual service project
router.get("/project/:id", getProjectDetails);

export default router;
