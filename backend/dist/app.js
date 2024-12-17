"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const rateLimiterMiddleware_1 = require("./middleware/rateLimiterMiddleware");
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(rateLimiterMiddleware_1.rateLimiterMiddleware);
// Routes
app.use("/api/data", dataRoutes_1.default);
// Global   Error handling middleware
app.use(errorMiddleware_1.globalErrorHandlerMiddleware);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
