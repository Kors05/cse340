
import db from "./db.js";

// Retrieve all categories from PostgreSQL
export async function getAllCategories() {
  const result = await db.query(
    `SELECT category_id, name
     FROM category
     ORDER BY name`
  );

  return result.rows;
}
