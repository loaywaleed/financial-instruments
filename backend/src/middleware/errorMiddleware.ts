/* Desc: Middleware for handling global errors */
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiError } from '../utils/apiErrorHandler';

/**
 * Middleware to handle global errors in the application.
 *
 * @param err - The error object that was thrown.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param _next - The next middleware function in the stack.
 *
 * This middleware captures any errors that occur during the request-response cycle,
 * logs the error details, and sends a response to the client.
 * If the error is an instance of ApiERROR, it uses the status code from the error,
 * The response includes the error message and, if not in production, the error stack trace.
 */
export const globalErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  logger.error(`${req.method} ${req.path} - ${statusCode} - ${err.message} - ${req.ip}`);
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
