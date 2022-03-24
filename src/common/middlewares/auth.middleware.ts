import { NextFunction, Request } from 'express';
import tokenUtil from '../../utils/token.util';
import { AppObject } from '../consts';
import { ErrorHandler } from '../error';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Check token from header
    const token = req.headers['authorization'];
    if (!token) {
      throw new ErrorHandler({ message: 'unauthorized', status: 401 });
    }

    const [tokenType, accessToken] = token.split(' ');
    if (tokenType !== AppObject.TOKEN_CONFIG.TYPE) {
      throw new ErrorHandler({ message: 'unauthorized', status: 401 });
    }

    // Check xsrf token from header
    const xsrfToken = req.headers['x-xsrf-token'] as string;
    if (!xsrfToken) {
      throw new ErrorHandler({ message: 'unauthorized', status: 401 });
    }

    // verify token with secret key and xsrf token
    const user = await tokenUtil.verifyToken({
      accessToken: accessToken,
      xsrfToken: xsrfToken,
    });
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError') {
      throw new ErrorHandler({
        message: 'unauthorized',
        status: 401,
        code: 'TOKEN_EXPIRED',
      });
    }

    if (error instanceof ErrorHandler) {
      return next(error);
    }
  }
}
