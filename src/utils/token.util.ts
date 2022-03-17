import { sign } from 'jsonwebtoken';
import APP_CONFIG from '../config/app.config';

export class TokenUtil {
  constructor() {}

  async decodeToken() {}

  static async signToken(payload: any): Promise<string> {
    console.log(APP_CONFIG.ENV.SECURE.JWT.EXPIRED_TIME);
    console.log(payload);

    return sign(
      { email: payload.email },
      APP_CONFIG.ENV.SECURE.JWT.SECRET_KEY,
      {
        expiresIn: APP_CONFIG.ENV.SECURE.JWT.EXPIRED_TIME,
      }
    );
  }

  async verifyToken() {}
}
