import got from 'got';
import { ErrorHandler } from '../../common/error';
import userService from '../user/user.service';
import { FacebookData } from './auth.interface';
class AuthService {
  constructor() {}

  async login(params) {
    // const userFound = await userRepository.detailByConditions({
    //   conditions: {
    //     email: params.email,
    //     status: { $ne: AppObject.COMMON_STATUS.DELETED },
    //   },
    // });
    // if (!userFound) {
    //   throw new ErrorHandler({ message: 'accountNotFound' });
    // }
    // if (userFound.status === AppObject.COMMON_STATUS.IN_ACTIVE) {
    //   throw new ErrorHandler({ message: 'accountInactive' });
    // }
    // if (!(await userFound.comparePassword(params.password))) {
    //   throw new ErrorHandler({ message: 'wrongPassword' });
    // }
    // return {
    //   accessToken: await TokenUtil.signToken(userFound),
    // };
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
}

export default new AuthService();
