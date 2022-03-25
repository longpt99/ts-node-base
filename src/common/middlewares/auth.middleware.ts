import { NextFunction, Request } from 'express';
import tokenUtil from '../../utils/token.util';
import { AppObject } from '../consts';
import { ErrorHandler } from '../error';
import { TokenModel } from '../interfaces';

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
      throw new ErrorHandler({
        message: 'unauthorized tokenType',
        status: 401,
      });
    }

    // Check xsrf token from header
    console.log(req.signedCookies);

    const xsrfToken = req.headers['x-xsrf-token'] as string;
    if (!xsrfToken) {
      throw new ErrorHandler({ message: 'unauthorized xsrf', status: 401 });
    }

    // verify token with secret key and xsrf token
    const user = await tokenUtil.verifyToken({
      accessToken: accessToken,
      xsrfToken: xsrfToken,
    });
    req.user = user as TokenModel;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ErrorHandler({
        message: 'unauthorized',
        status: 401,
        code: 'TOKEN_EXPIRED',
      });
    }
    return next(error);
  }
}
