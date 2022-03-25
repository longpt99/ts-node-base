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

  async signToken(
    payload: any
  ): Promise<{ xsrfToken: string; accessToken: string }> {
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

  async signRefreshToken(userId: string): Promise<string> {
    return sign(
      { id: userId },
      APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.SECRET_KEY,
      {
        expiresIn: APP_CONFIG.ENV.SECURE.JWT_REFRESH_TOKEN.EXPIRED_TIME,
      }
    );
  }

  async verifyToken(params: {
    accessToken: string;
    xsrfToken: string;
  }): Promise<JwtPayload> {
    const privateKey =
      APP_CONFIG.ENV.SECURE.JWT_ACCESS_TOKEN.SECRET_KEY + params.xsrfToken;
    return verify(params.accessToken, privateKey) as JwtPayload;
  }

  async clearTokens(res: Response): Promise<void> {
    res.clearCookie('XSRF-TOKEN');
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
  }
}

export default new TokenUtil();
