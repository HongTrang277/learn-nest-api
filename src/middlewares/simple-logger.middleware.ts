import { Request, Response, NextFunction } from 'express';


export function simpleLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log(`[Function Middleware] ${req.method} ${req.originalUrl}`);
  next();
}
