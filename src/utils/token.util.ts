import { CookieOptions, Response } from 'express';
import jwt from 'jsonwebtoken';
import APP_CONFIG from '../config/app.config';
import { CacheManagerUtil } from './cache-manager.util';

const { sign, verify } = jwt;

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: !(process.env.NODE_ENV !== 'production'),
  signed: true,
  sameSite: 'lax',
};

export class TokenUtil {
  private cacheManagerUtil: CacheManagerUtil;

  constructor() {
    this.cacheManagerUtil = new CacheManagerUtil();
  }

  async decodeToken() {}

  public signToken(payload: any): string {
    const accessToken = sign(
      payload,
      APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.SECRET_KEY,
      { expiresIn: APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.EXPIRED_TIME }
    );

    this.cacheManagerUtil.setKey({
      key: `caches:sessions:${accessToken.split('.')[2]}`,
      value: accessToken.split('.')[2],
      exp: APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.EXPIRED_TIME,
    });

    return accessToken;
  }

  public signRefreshToken(userId: string, res: Response): string {
    const token = sign(
      { id: userId },
      APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.SECRET_KEY,
      {
        expiresIn: APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.EXPIRED_TIME,
      }
    );
    res.cookie(
      'refreshToken',
      token,
      Object.assign(COOKIE_OPTIONS, {
        expires: new Date(
          Date.now() +
            APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.EXPIRED_TIME * 1000
        ),
      })
    );
    return token;
  }

  public verifyToken(token: string): jwt.JwtPayload {
    return verify(
      token,
      APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.SECRET_KEY
    ) as jwt.JwtPayload;
  }

  public verifyRefreshToken(token: string): jwt.JwtPayload {
    return verify(
      token,
      APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.SECRET_KEY
    ) as jwt.JwtPayload;
  }

  public clearTokens(res: Response, signedKey: string): void {
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    this.cacheManagerUtil.delKey(`caches:sessions:${signedKey}`);
  }
}
