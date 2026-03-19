import express from "express";
import * as authRegister from "../controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizedRole } from "../middleware/role.middleware.js";
import { RoleTypes } from "../types/users.types.js";

const router = express.Router();

// Public routes
router.post("/register", authRegister._register);
router.post("/login", authRegister._login);

// Protected route
router.get("/profile",
    protect,
    authorizedRole(RoleTypes.ADMIN),
    authRegister._profiles
);

export default router;
