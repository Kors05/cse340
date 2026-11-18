
import db from "./db.js";

// Retrieve all organizations from PostgreSQL
export const getAllOrganizations = async () => {
  const result = await db.query(
    "SELECT * FROM organization ORDER BY organization_id"
  );

  return result.rows;
};
