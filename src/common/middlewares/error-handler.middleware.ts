import { NextFunction, Request, Response } from 'express';
import { normalize } from 'path';
import { ErrorHandler } from '../../libs/error';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // if (err instanceof ErrorHandler) {
  return res.error(err);
  // }
  // return res.sendFile(normalize(__dirname + '/assets/html/not-found.html'));
}
