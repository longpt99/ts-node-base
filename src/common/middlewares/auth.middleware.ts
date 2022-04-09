import { NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TokenModel } from '../../libs';
import { ErrorHandler } from '../../libs/error';
import { TokenUtil } from '../../utils';
import { CacheManagerUtil } from '../../utils/cache-manager.util';
import { AppConst } from '../consts';

const tokenUtil = new TokenUtil();
const cacheManagerUtil = new CacheManagerUtil();

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Check token from header
    const token = req.headers['authorization'];
    if (!token) {
      throw new ErrorHandler({
        message: 'unauthorized',
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    const [tokenType, accessToken] = token.split(' ');
    if (tokenType !== AppConst.TOKEN_TYPE) {
      throw new ErrorHandler({
        message: 'unauthorized',
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    const isFounded = await cacheManagerUtil.getKey(
      `caches:sessions:${accessToken.split('.')[2]}`
    );

    if (!isFounded) {
      throw new ErrorHandler({
        message: 'unauthorized',
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    // Check user session

    // Verify token
    const user = tokenUtil.verifyToken(accessToken);
    user.accessToken = accessToken;
    req.user = user as TokenModel;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ErrorHandler({
        message: 'unauthorized',
        status: StatusCodes.UNAUTHORIZED,
        code: 'TOKEN_EXPIRED',
      });
    }
    return next(error);
  }
}
