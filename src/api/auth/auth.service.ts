import { Response } from 'express';
import got from 'got';
import { utils } from 'mocha';
import { AppObject } from '../../common/consts';
import { ErrorHandler } from '../../common/error';
import tokenUtil, { COOKIE_OPTIONS } from '../../utils/token.util';
import userService from '../user/user.service';
import { FacebookData } from './auth.interface';
class AuthService {
  constructor() {}

  async login(params: { body: any; res: Response }) {
    const userFound = await userService.getUserByConditions({
      conditions: { email: params.body.email },
      select: ['id', 'password', 'status'],
    });

    if (!(await userFound.comparePassword(params.body.password))) {
      throw new ErrorHandler({ message: 'wrongPassword' });
    }

    return this._signToken({ res: params.res, payload: { id: userFound.id } });
  }

  async register(params) {
    const userCreated = await userService.create(params);
    return userCreated;
  }

  async adminLogin(params) {}

  async loginFacebook(params) {
    const { access_token } = await got(
      'https://graph.facebook.com/v13.0/oauth/access_token',
      {
        method: 'GET',
        searchParams: {
          client_id: 280781597506441,
          client_secret: '54ae9879655813b508f46795946b57ad',
          redirect_uri: 'http://localhost:8080/api/v1/auth/facebook',
          code: params.code,
        },
      }
    ).json();

    const facebookData: FacebookData = await got(
      'https://graph.facebook.com/me',
      {
        method: 'GET',
        searchParams: {
          fields: [
            'id',
            'email',
            'first_name',
            'last_name',
            'gender',
            'birthday',
          ].join(','),
          access_token: access_token,
        },
      }
    ).json();

    const userFound = await userService.getUserByFacebookId(facebookData);
    return facebookData;
  }

  async loginGoogle(params) {
    const { access_token } = await got('https://oauth2.googleapis.com/token', {
      method: 'POST',
      searchParams: {
        client_id:
          '873379095237-sq8rsuemift9rl903frqmn82gr2q4l22.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'http://localhost:8080/api/v1/auth/google',
        grant_type: 'authorization_code',
        code: params.code,
      },
    }).json();
    const googleData: any = await got(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    ).json();

    const t = await got(
      `https://people.googleapis.com/v1/people/${googleData.id}`,
      {
        method: 'GET',
        searchParams: { personFields: ['birthdays', 'genders'].join(',') },
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    return googleData;
  }

  async logout(res: Response) {
    await tokenUtil.clearTokens(res);
    return { isSuccess: true };
  }

  private async _signToken(params: { res: Response; payload: any }) {
    const [{ accessToken, xsrfToken }, refreshToken] = await Promise.all([
      tokenUtil.signToken({
        id: params.payload.id,
      }),
      tokenUtil.signRefreshToken(params.payload.id),
    ]);

    params.res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    params.res.cookie('XSRF-TOKEN', xsrfToken);

    return { accessToken: accessToken, tokenType: AppObject.TOKEN_CONFIG.TYPE };
  }
}

export default new AuthService();
