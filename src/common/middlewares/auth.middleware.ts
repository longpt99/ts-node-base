import { NextFunction, Request } from 'express';
import { TokenModel } from '../../libs';
import { ErrorHandler } from '../../libs/error';
import tokenUtil from '../../utils/token.util';
import { AppConst } from '../consts';

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
    if (tokenType !== AppConst.TOKEN_TYPE) {
      throw new ErrorHandler({ message: 'unauthorized', status: 401 });
    }

    // Check user session

    // Verify token
    const user = tokenUtil.verifyToken(accessToken);
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
