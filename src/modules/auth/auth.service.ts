import { Response } from 'express';
import got from 'got';
import { getCustomRepository } from 'typeorm';
import { AppConst, AppObject } from '../../common/consts';
import { client } from '../../config/databases/database';
import { TokenModel } from '../../libs';
import { ErrorHandler, UnauthorizedError } from '../../libs/errors';
import { CacheManagerUtil } from '../../utils/cache-manager.util';
import StatusCodes from '../../utils/status-code';
import { TokenUtil } from '../../utils/token.util';
import { UserModel } from '../user/user.interface';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import {
  FacebookData,
  LoginParams,
  RegisterParams,
  SignTokenResponse,
  TokenPayload,
} from './auth.interface';

export class AuthService {
  private static instance: AuthService;
  private userService: UserService;
  private tokenUtil: TokenUtil;
  private userRepository: UserRepository;
  private cacheManager: CacheManagerUtil;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    this.userService = new UserService();
    this.tokenUtil = new TokenUtil();
    this.userRepository = getCustomRepository(UserRepository);
    this.cacheManager = new CacheManagerUtil(client);
    AuthService.instance = this;
  }

  async login(params: {
    body: LoginParams;
    res: Response;
  }): Promise<SignTokenResponse> {
    let userFound!: UserModel;

    switch (params.body.grantType) {
      case AppObject.GRANT_TYPES.FACEBOOK: {
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
              access_token: params.body.token,
            },
          }
        ).json();
        userFound = await this.userService.getUserByFacebookId(facebookData);
        break;
      }
      case AppObject.GRANT_TYPES.GOOGLE: {
        break;
      }
      default: {
        userFound = await this.userService.getUserByConditions({
          conditions: { mobilePhone: params.body.mobilePhone },
          // select: ['id', 'password', 'status'],
        });

        // if (!(await userFound.comparePassword(params.body.password))) {
        //   throw new ErrorHandler({ message: 'wrongPassword' });
        // }
        break;
      }
    }

    return this._signToken({ id: userFound.id });
  }

  async register(params: RegisterParams) {
    const userCreated = await this.userService.create(params);
    return userCreated;
  }

  async adminLogin(params) {}

  async loginFacebook(params) {
    const data = await got(
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

    return data;

    // console.log('Data fb: ', t);

    // const facebookData: FacebookData = await got(
    //   'https://graph.facebook.com/me',
    //   {
    //     method: 'GET',
    //     searchParams: {
    //       fields: [
    //         'id',
    //         'email',
    //         'first_name',
    //         'last_name',
    //         'gender',
    //         'birthday',
    //       ].join(','),
    //       access_token: t.access_token,
    //     },
    //   }
    // ).json();

    // // const userFound = await this.userService.getUserByFacebookId(facebookData);
    // return facebookData;
  }

  async loginGoogle(params) {
    const data: any = await got('https://oauth2.googleapis.com/token', {
      method: 'POST',
      searchParams: {
        client_id:
          '820557249269-70q12aui903ueojbceujgdc7tameru42.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'http://localhost:8080/api/v1/auth/google',
        grant_type: 'authorization_code',
        code: params.code,
      },
    }).json();
    console.log('GG data: ', data);

    const googleData: any = await got(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    ).json();

    try {
      const googleData2: any = await got(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${data.id_token}`,
        {
          method: 'POST',
          // headers: {
          //   Authorization: `Bearer ${data.access_token}`,
          // },
        }
      ).json();

      // const t = await got(
      //   `https://people.googleapis.com/v1/people/${googleData.id}`,
      //   {
      //     method: 'GET',
      //     searchParams: { personFields: ['birthdays', 'genders'].join(',') },
      //     headers: { Authorization: `Bearer ${data.access_token}` },
      //   }
      // );

      return googleData2;
    } catch (error) {
      console.log(error);
    }
  }

  async refreshToken(token: string) {
    const payload = this.tokenUtil.verifyRefreshToken(token);
    const tokenKey = await this.cacheManager.getKey(
      `caches:users:${payload.id}:refreshTokens:${token.split('.')[2]}`
    );

    if (!tokenKey && token.split('.')[2] !== tokenKey) {
      throw new UnauthorizedError();
    }

    return this._signToken(payload);
  }

  async logout(userId: string): Promise<void> {
    this.cacheManager.client.keys(`caches:users:${userId}:*`, (err, data) => {
      this.cacheManager.delKey(data);
    });
  }

  private _signToken(payload: TokenPayload): SignTokenResponse {
    return {
      accessToken: this.tokenUtil.signToken(payload),
      refreshToken: this.tokenUtil.signRefreshToken(payload),
      tokenType: AppObject.TOKEN_TYPES.BEARER,
    };
  }
}
