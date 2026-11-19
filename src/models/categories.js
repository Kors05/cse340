
import db from "./db.js";

// Retrieve all categories from PostgreSQL
export const getAllCategories = async () => {
  const result = await db.query(
    `SELECT category_id, name
     FROM category
     ORDER BY name`
  );

  return result.rows;
};


 
// Retrieve all categories associated with a project
export const getCategoriesByProjectId = async (projectId) => {
  const result = await db.query(
    `SELECT
      c.category_id,
      c.name
    FROM category c
    JOIN project_category pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name`,
    [projectId]
  );

  return result.rows;
};


 
// Retrieve a single category by its ID
export const getCategoryById = async (id) => {
  const result = await db.query(
    `SELECT
      category_id,
      name
    FROM category
    WHERE category_id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
};

// Retrieve all projects associated with a category
export const getProjectsByCategoryId = async (categoryId) => {
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
    JOIN project_category pc
      ON p.project_id = pc.project_id
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE pc.category_id = $1
    ORDER BY p.date ASC NULLS LAST, p.name ASC`,
    [categoryId]
  );

  return result.rows;
};
