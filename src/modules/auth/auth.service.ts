import { Response } from 'express';
import got from 'got';
import { getCustomRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { AppConst, AppObject } from '../../common/consts';
import { TokenModel } from '../../libs';
import { ErrorHandler } from '../../libs/error';
import { TokenUtil } from '../../utils/token.util';
import { UserModel } from '../user/user.interface';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import {
  FacebookData,
  LoginParams,
  RegisterParams,
  SignTokenResponse,
} from './auth.interface';

export class AuthService {
  private static instance: AuthService;
  private userService: UserService;
  private tokenUtil: TokenUtil;
  private userRepository: UserRepository;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    this.userService = new UserService();
    this.tokenUtil = new TokenUtil();
    this.userRepository = getCustomRepository(UserRepository);
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

    return this._signToken({ res: params.res, payload: { id: userFound.id } });
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

  async refreshToken(params: {
    res: Response;
    refreshToken: string;
  }): Promise<SignTokenResponse> {
    if (!params.refreshToken) {
      throw new ErrorHandler({
        message: 'Unauthorized',
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    try {
      const payload = this.tokenUtil.verifyRefreshToken(params.refreshToken);
      return this._signToken({ payload: { id: payload.id }, res: params.res });
    } catch (error) {
      throw new ErrorHandler({
        message: 'unauthorized',
        status: StatusCodes.UNAUTHORIZED,
      });
    }
  }

  async logout(res: Response, user: TokenModel): Promise<void> {
    this.tokenUtil.clearTokens(res, user.accessToken.split('.')[2]);
  }

  private _signToken(params: {
    res: Response;
    payload: any;
  }): SignTokenResponse {
    const accessToken = this.tokenUtil.signToken({
      id: params.payload.id,
    });
    this.tokenUtil.signRefreshToken(params.payload.id, params.res);
    return { accessToken: accessToken, tokenType: AppConst.TOKEN_TYPE };
  }
}
