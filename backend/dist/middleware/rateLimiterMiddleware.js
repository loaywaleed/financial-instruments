"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiterMiddleware = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = require("../utils/logger");
exports.rateLimiterMiddleware = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger_1.logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            message: "Too many requests, please try again later.",
        });
    },
});
