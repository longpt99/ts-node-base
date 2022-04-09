import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // if (err instanceof ErrorHandler) {
  console.log(err);

  return res.error(err);
  // }
  // return res.sendFile(normalize(__dirname + '/assets/html/not-found.html'));
}
