import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Request error:', {
    method: req.method,
    path: req.path,
    error: err.message
  });

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details && { details: err.details })
    });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON'
    });
  }

  return res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
}

export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
