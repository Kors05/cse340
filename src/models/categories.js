
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
