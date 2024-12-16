import express, { Application } from "express";
import helmet from "helmet";
import { rateLimiterMiddleware } from "./middleware/rateLimiterMiddleware";
import dataRoutes from "./routes/dataRoutes";
import { globalErrorHandlerMiddleware } from "./middleware/errorMiddleware";

const PORT = process.env.PORT || 8000;

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(rateLimiterMiddleware);

// Routes
app.use("/api/data", dataRoutes);

// Global   Error handling middleware
app.use(globalErrorHandlerMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
