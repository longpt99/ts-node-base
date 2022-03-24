import { JwtPayload, sign, verify } from 'jsonwebtoken';
import APP_CONFIG from '../config/app.config';
import { StringUtil } from './string.util';

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
      { userId: userId },
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
}

export default new TokenUtil();
