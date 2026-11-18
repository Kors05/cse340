
import db from "./db.js";

// Retrieve all projects with their organization names
export const getAllProjects = async () => {
  const result = await db.query(`
    SELECT
      p.project_id,
      p.name,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    ORDER BY p.name
  `);

  return result.rows;
};
