"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandlerMiddleware = void 0;
const apiErrorHandler_1 = require("../utils/apiErrorHandler");
const globalErrorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err instanceof apiErrorHandler_1.ApiError ? err.statusCode : 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};
exports.globalErrorHandlerMiddleware = globalErrorHandlerMiddleware;
