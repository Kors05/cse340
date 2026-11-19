
import express from "express";

import {
  getCategories,
  getCategoryDetails,
} from "../controllers/categoriesController.js";

const router = express.Router();

// Display all service project categories
router.get("/categories", getCategories);

// Display an individual category and its projects
router.get("/category/:id", getCategoryDetails);

export default router;
