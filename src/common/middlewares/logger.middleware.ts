import { Request, Response, NextFunction } from 'express';

export function responseMiddleware(req: Request, res: Response, next) {
  console.log(12312312312, res);

  next();
}
