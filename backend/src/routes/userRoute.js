import express from 'express';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    searchUsers,
    validate
} from '../controllers/userController.js';

export const userRoute = express.Router();

// Description: Search users by criteria
// Route: /api/users/search?query=test@example.com&page=2&pageSize=10&sort=lastName:asc
userRoute.get("/search", verifyTokenMiddleware, searchUsers);

// Description: Get all users
// Route: /api/users
userRoute.get("/", verifyTokenMiddleware, getUsers);

// Description: Get a user by id
// Route: /api/users/{id}
userRoute.get("/:id",verifyTokenMiddleware, getUserById);

// Description: Create a new user
// Route: /api/users
userRoute.post("/", verifyTokenMiddleware, createUser);

// Route: /api/users/{id}
// Description: Update a user completely
userRoute.put("/:id", verifyTokenMiddleware, updateUser);

// Route: /api/users/{id}
// Description: Update a user partially
userRoute.patch("/:id", verifyTokenMiddleware, patchUser);

// Route: /api/users/:id
// Description: Delete a user
userRoute.delete("/:id", verifyTokenMiddleware, deleteUser);

// Route: /api/users/login
// Description: Authenticate user by email and password
userRoute.post("/login", validate)