import { NextFunction, Request } from 'express';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error('');
  }
  const [tokenType, token] = authorization.split(' ');
  if (tokenType !== 'Bearer') {
    throw new Error('');
  }
  const user = '';
  req.user = user;
  next();
}
