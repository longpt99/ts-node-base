import { Response } from 'express';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import APP_CONFIG from '../config/app.config';
import { StringUtil } from './string.util';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !(process.env.NODE_ENV !== 'production'),
  signed: true,
};
export class TokenUtil {
  constructor() {}

  async decodeToken() {}

  public signToken(payload: any): { xsrfToken: string; accessToken: string } {
    const xsrfToken = StringUtil.random();
    const accessToken = sign(
      payload,
      APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.SECRET_KEY + xsrfToken,
      { expiresIn: APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.EXPIRED_TIME }
    );

    return {
      xsrfToken: xsrfToken,
      accessToken: accessToken,
    };
  }

  public signRefreshToken(userId: string): string {
    return sign(
      { id: userId },
      APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.SECRET_KEY,
      {
        expiresIn: APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.EXPIRED_TIME,
      }
    );
  }

  public verifyToken(token: string): JwtPayload {
    return verify(
      token,
      APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.SECRET_KEY
    ) as JwtPayload;
  }

  public clearTokens(res: Response): void {
    res.clearCookie('XSRF-TOKEN');
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
  }
}

export default new TokenUtil();
