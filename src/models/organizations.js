
import db from "./db.js";

// Retrieve all organizations from PostgreSQL
export const getAllOrganizations = async () => {
  const result = await db.query(
    "SELECT * FROM organization ORDER BY organization_id"
  );

  return result.rows;
};

// Retrieve a single organization by its ID
export const getOrganizationById = async (id) => {
  const result = await db.query(
    `SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM organization
    WHERE organization_id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
};

// Retrieve all service projects for an organization
export const getProjectsByOrganizationId = async (id) => {
  const result = await db.query(
    `SELECT
      project_id,
      name,
      description,
      location,
      date
    FROM project
    WHERE organization_id = $1
    ORDER BY date ASC NULLS LAST, name ASC`,
    [id]
  );

  return result.rows;
};
