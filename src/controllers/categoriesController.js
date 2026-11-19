
import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
} from "../models/categories.js";

// Display all service project categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Service Project Categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// Display an individual category and its projects
export const getCategoryDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate the category ID
    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(404).render("404", {
        title: "Category Not Found",
      });
    }

    // Retrieve the category
    const category = await getCategoryById(id);

    // Handle categories that do not exist
    if (!category) {
      return res.status(404).render("404", {
        title: "Category Not Found",
      });
    }

    // Retrieve projects associated with the category
    const projects = await getProjectsByCategoryId(id);

    // Render the category details page
    res.render("category-details", {
      title: category.name,
      category,
      projects,
    });
  } catch (error) {
    next(error);
  }
};
