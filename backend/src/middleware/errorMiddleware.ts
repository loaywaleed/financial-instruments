import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiError } from '../utils/apiErrorHandler';

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
