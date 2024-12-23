import { Request, Response, NextFunction } from 'express';
import { globalErrorHandlerMiddleware } from '../../src/middleware/errorMiddleware';
import { logger } from '../../src/utils/logger';
import { ApiError } from '../../src/utils/apiErrorHandler';

jest.mock('../../src/utils/logger');

describe('globalErrorHandlerMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'GET',
      path: '/test',
      ip: '127.0.0.1',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should handle ApiError correctly', () => {
    const error = new ApiError('Test ApiError', 400);

    globalErrorHandlerMiddleware(error, req as Request, res as Response, next);

    expect(logger.error).toHaveBeenCalledWith('GET /test - 400 - Test ApiError - 127.0.0.1');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test ApiError',
      stack: expect.any(String),
    });
  });

  it('should handle generic errors correctly', () => {
    const error = new Error('Test Error');

    globalErrorHandlerMiddleware(error, req as Request, res as Response, next);

    expect(logger.error).toHaveBeenCalledWith('GET /test - 500 - Test Error - 127.0.0.1');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test Error',
      stack: expect.any(String),
    });
  });

  it('should not include stack trace in production', () => {
    process.env.NODE_ENV = 'production';
    const error = new Error('Test Error');

    globalErrorHandlerMiddleware(error, req as Request, res as Response, next);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Test Error',
      stack: undefined,
    });

    process.env.NODE_ENV = 'test';
  });
});
