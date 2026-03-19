import express from "express";
import authRoutes from "./routes/auth.router.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Global error handler
app.use(errorHandler);

export default app;
