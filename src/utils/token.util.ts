import { sign } from 'jsonwebtoken';
import APP_CONFIG from '../config/app.config';

export class TokenUtil {
  constructor() {}

  async decodeToken() {}

  async signToken(payload): Promise<string> {
    return sign(payload, APP_CONFIG.SECURE.TOKEN.SECRET_KEY, {
      expiresIn: APP_CONFIG.SECURE.TOKEN.EXPIRED_TIME,
    });
  }

  async verifyToken() {}
}
