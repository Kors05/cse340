
import db from "./db.js";

// Retrieve all service projects
export const getAllProjects = async () => {
  const result = await db.query(`
    SELECT
      p.project_id,
      p.name,
      p.description,
      p.location,
      p.date,
      p.organization_id,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    ORDER BY p.name
  `);

  return result.rows;
};

// Retrieve the next five upcoming service projects
export const getUpcomingProjects = async () => {
  const result = await db.query(`
    SELECT
      p.project_id,
      p.name,
      p.description,
      p.location,
      p.date,
      p.organization_id,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC, p.project_id ASC
    LIMIT 5
  `);

  return result.rows;
};


 
// Retrieve a single service project by its ID
export const getProjectById = async (id) => {
  const result = await db.query(
    `SELECT
      p.project_id,
      p.name,
      p.description,
      p.location,
      p.date,
      p.organization_id,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
};
