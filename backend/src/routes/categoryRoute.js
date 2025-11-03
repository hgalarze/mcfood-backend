import express from 'express';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js';
import {
    searchCategories,
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    patchCategory,
    deleteCategory
}
from '../controllers/categoryController.js';

export const categoryRoute = express.Router();

// Description: Search categories by criteria
// Route: /api/categories/search?query=burguers&page=2&pageSize=10&sort=lastName:asc
categoryRoute.get("/search", verifyTokenMiddleware, searchCategories);

// Description: Get all categories
// Route: /api/categories
categoryRoute.get("/", getCategories);

// Description: Get a category by id
// Route: /api/categories/{id}
categoryRoute.get("/:id", getCategoryById);

// Description: Create a new category
// Route: /api/categories
categoryRoute.post("/", verifyTokenMiddleware, createCategory);

// Route: /api/categories/{id}
// Description: Update a category completely
categoryRoute.put("/:id", verifyTokenMiddleware, updateCategory);

// Route: /api/categories/{id}
// Description: Update a category partially
categoryRoute.patch("/:id", verifyTokenMiddleware, patchCategory);

// Route: /api/categories/:id
// Description: Delete a category
categoryRoute.delete("/:id", verifyTokenMiddleware, deleteCategory);