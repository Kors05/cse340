
import {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganizationId,
} from "../models/organizations.js";

// Display all partner organizations
export const getOrganizations = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations,
    });
  } catch (error) {
    next(error);
  }
};

// Display a single organization and its service projects
export const getOrganizationDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate the organization ID
    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(404).render("404", {
        title: "Organization Not Found",
      });
    }

    // Retrieve the organization
    const organization = await getOrganizationById(id);

    if (!organization) {
      return res.status(404).render("404", {
        title: "Organization Not Found",
      });
    }

    // Retrieve projects belonging to the organization
    const projects = await getProjectsByOrganizationId(id);

    // Render the organization details page
    res.render("organization-details", {
      title: organization.name,
      organization,
      projects,
    });
  } catch (error) {
    next(error);
  }
};
