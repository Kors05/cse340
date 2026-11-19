
import express from "express";

import {
  getOrganizations,
  getOrganizationDetails,
} from "../controllers/organizationsController.js";

const router = express.Router();

// Display all partner organizations
router.get("/organizations", getOrganizations);

// Display an individual organization
router.get("/organization/:id", getOrganizationDetails);

export default router;
