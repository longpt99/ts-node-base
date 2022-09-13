import { NextFunction, Request } from 'express';
import { client } from '../../configs/databases/database';
import { TokenModel } from '../../libs';
import { ErrorHandler } from '../../libs/errors';
import { TokenUtil } from '../../utils';
import { CacheManagerUtil } from '../../utils/cache-manager.util';
import StatusCodes from '../../utils/status-code';
import { AppConst } from '../consts';

const tokenUtil = new TokenUtil();
const cacheManagerUtil = new CacheManagerUtil(client);

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Check token from header
    const token = req.headers['authorization'];
    if (!token) {
      throw new ErrorHandler({
        message: StatusCodes.getReasonPhraseCode(401),
      });
    }

    const [tokenType, accessToken] = token.split(' ');
    if (tokenType !== AppConst.TOKEN_TYPE) {
      throw new ErrorHandler({
        message: StatusCodes.getReasonPhraseCode(401),
      });
    }

    const isFounded = await cacheManagerUtil.getKey(
      `caches:sessions:${accessToken.split('.')[2]}`
    );

    if (!isFounded) {
      throw new ErrorHandler({
        message: StatusCodes.getReasonPhraseCode(401),
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
        message: StatusCodes.getReasonPhraseCode(401),
        code: 'TOKEN_EXPIRED',
      });
    }
    return next(error);
  }
}
