import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from "./src/models/db.js";
import organizationsRoutes from "./src/routes/organizationsRoutes.js";
import categoriesRoutes from "./src/routes/categoriesRoutes.js";
import projectsRoutes from "./src/routes/projectsRoutes.js";


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

// Organization routes (MVC)
app.use("/", organizationsRoutes);

// Project routes (MVC)
app.use("/", projectsRoutes);

// Category routes (MVC)
app.use("/", categoriesRoutes);

// Handle routes that do not exist
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
  });
});

// Handle unexpected server errors
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).render("500", {
    title: "Internal Server Error",
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