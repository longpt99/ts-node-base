import { CookieOptions, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import APP_CONFIG from '../configs/app.config';
import RedisConfig from '../configs/databases/redis.config';
import { TokenPayload } from '../modules/auth/auth.interface';
import { CacheManagerUtil } from './cache-manager.util';

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: !(process.env.NODE_ENV !== 'production'),
  signed: true,
  sameSite: 'lax',
};

export class TokenUtil {
  private cacheManagerUtil: CacheManagerUtil;

  constructor() {
    this.cacheManagerUtil = new CacheManagerUtil(RedisConfig.client);
  }

  async decodeToken() {}

  public signToken(payload: TokenPayload): string {
    const accessToken = sign(
      payload,
      APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.SECRET_KEY,
      { expiresIn: APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.EXPIRED_TIME }
    );

    this.cacheManagerUtil.setKey({
      key: `caches:users:${payload.id}:accessTokens:${
        accessToken.split('.')[2]
      }`,
      value: accessToken.split('.')[2],
      exp: APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.EXPIRED_TIME,
    });

    return accessToken;
  }

  public signRefreshToken(payload: TokenPayload): string {
    const token = sign(
      { id: payload.id },
      APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.SECRET_KEY,
      { expiresIn: APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.EXPIRED_TIME }
    );

    this.cacheManagerUtil.setKey({
      key: `caches:users:${payload.id}:refreshTokens:${token.split('.')[2]}`,
      value: token.split('.')[2],
      exp: APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.EXPIRED_TIME,
    });

    return token;
  }

  public verifyToken(token: string) {
    return verify(
      token,
      APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.SECRET_KEY
    ) as TokenPayload;
  }

  public verifyRefreshToken(token: string) {
    return verify(
      token,
      APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.SECRET_KEY
    ) as TokenPayload;
  }

  public clearTokens(res: Response, signedKey: string): void {
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    this.cacheManagerUtil.delKey(`caches:sessions:${signedKey}`);
  }
}
