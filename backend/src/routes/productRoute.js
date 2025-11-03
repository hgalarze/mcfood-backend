import express from 'express';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js';
import {
    getProducts,
    getProductById,
    getProductsByCategoryId,
    getHighlightedProducts,
    searchProducts,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
}
from '../controllers/productController.js';

export const productRoute = express.Router();

// Description: Search products by criteria
// Route: /api/products/search?query=burguers&page=2&pageSize=10&sort=lastName:asc
productRoute.get("/search", verifyTokenMiddleware, searchProducts);

// Description: Get all products
// Route: /api/products
productRoute.get("/", verifyTokenMiddleware, getProducts);

// Description: Get a product by id
// Route: /api/products/{id}
productRoute.get("/:id",verifyTokenMiddleware, getProductById);

// Description: Get a product by id
// Route: /api/products/by-category/{id}
productRoute.get("/by-category/:id", getProductsByCategoryId);

// Description: Get a product by id
// Route: /api/products/by-category/{id}
productRoute.get("/highlighted/:maxItems", getHighlightedProducts);

// Description: Create a new product
// Route: /api/products
productRoute.post("/", verifyTokenMiddleware, createProduct);

// Route: /api/products/{id}
// Description: Update a product completely
productRoute.put("/:id", verifyTokenMiddleware, updateProduct);

// Route: /api/products/{id}
// Description: Update a product partially
productRoute.patch("/:id", verifyTokenMiddleware, patchProduct);

// Route: /api/products/:id
// Description: Delete a product
productRoute.delete("/:id", verifyTokenMiddleware, deleteProduct);