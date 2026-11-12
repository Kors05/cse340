import db from "./db.js";

// Retrieve all organizations from PostgreSQL
export async function getAllOrganizations() {
  const result = await db.query(
    "SELECT * FROM organization ORDER BY organization_id"
  );

  return result.rows;
}