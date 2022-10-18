import { NextFunction, Request } from 'express';
import RedisConfig from '../../configs/databases/redis.config';
import { TokenModel } from '../../libs';
import { UnauthorizedError } from '../../libs/errors';
import { ForbiddenError } from '../../libs/errors/forbidden.error';
import { TokenUtil } from '../../utils';
import { CacheManagerUtil } from '../../utils/cache-manager.util';
import { AppConst, AppObject } from '../consts';

const tokenUtil = new TokenUtil();
const cacheManagerUtil = new CacheManagerUtil(RedisConfig.client);

export function authMiddleware(roles: string[]) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Check token from header
      const token = req.headers['authorization'] || '';
      const [tokenType, accessToken] = token.split(' ');
      const user = tokenUtil.verifyToken(accessToken);
      const userData = await cacheManagerUtil.getKey(
        `caches:profiles:${user.id}`
      );
      if (tokenType !== AppConst.TOKEN_TYPE || !userData) {
        throw new UnauthorizedError();
      }
      const role = (userData.role as string) ?? AppObject.CUSTOMER;
      if (!roles.includes(role)) {
        throw new ForbiddenError();
      }
      req.user = userData as TokenModel;
      return next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return next(new UnauthorizedError({ code: 'TOKEN_EXPIRED' }));
      }
      return next(error);
    }
  };
}
