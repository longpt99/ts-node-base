import { NextFunction, Request, Response } from 'express';
import { normalize } from 'path';
import tokenUtil from '../../utils/token.util';
import { AppObject } from '../consts';
import { ErrorHandler } from '../error';
import { TokenModel } from '../interfaces';

export async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ErrorHandler) {
    return res.error(err);
  }
  return res.sendFile(normalize(__dirname + '/assets/html/not-found.html'));
}
