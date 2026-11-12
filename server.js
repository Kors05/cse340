import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from "./src/models/db.js";
import { getAllOrganizations } from "./src/models/organizations.js";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express application
const app = express();

// Configure EJS as the template engine
app.set("view engine", "ejs");

// Set the location of EJS templates
app.set("views", path.join(__dirname, "src/views"));

// Set the port
const PORT = process.env.PORT || 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home"
  });
});

// Organizations route
app.get("/organizations", async (req, res) => {
  try {
    const organizations = await getAllOrganizations();
    console.log("ORGANIZATIONS ROUTE TEST:", organizations);

    res.render("organizations", {
      title: "Organizations",
      organizations: organizations
    });
  } catch (error) {
    console.error("Error retrieving organizations:", error);
    res.status(500).send("Error loading organizations");
  }
});

// Projects route
app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Projects"
  });
});

// Categories route
app.get("/categories", (req, res) => {
  res.render("categories", {
    title: "Categories"
  });
});

// Start the server
app.listen(process.env.PORT || 3000, async () => {
  try {
    await testConnection();
    console.log("Database connection test completed successfully.");
    console.log("Server is running on port " + (process.env.PORT || 3000));
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
});