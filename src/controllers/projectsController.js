
import {
  getUpcomingProjects,
  getProjectById,
} from "../models/projects.js";

import {
  getCategoriesByProjectId,
} from "../models/categories.js";

// Display the next five upcoming service projects
export const getProjects = async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects();

    res.render("projects", {
      title: "Upcoming Service Projects",
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// Display an individual service project
export const getProjectDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate the project ID
    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(404).render("404", {
        title: "Project Not Found",
      });
    }

    // Retrieve the project from PostgreSQL
    const project = await getProjectById(id);

    // Handle projects that do not exist
    if (!project) {
      return res.status(404).render("404", {
        title: "Project Not Found",
      });
    }

    // Retrieve categories associated with the project
    const categories = await getCategoriesByProjectId(id);

    // Render the project details page
    res.render("project-details", {
      title: project.name,
      project,
      categories,
    });
  } catch (error) {
    next(error);
  }
};
