import got from 'got';
import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import RedisConfig from '../../configs/databases/redis.config';
import { ErrorHandler, UnauthorizedError } from '../../libs/errors';
import { StringUtil } from '../../utils';
import { CacheManagerUtil } from '../../utils/cache-manager.util';
import { TokenUtil } from '../../utils/token.util';
import { UserModel, VerifyAccount } from '../user/user.interface';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import {
  AdminLoginParams,
  FacebookData,
  LoginParams,
  RegisterParams,
  SignTokenResponse,
  TokenPayload,
} from './auth.interface';
import qs from 'query-string';
import { Response } from 'express';
import { AdminModel } from '../admin/admin.model';
import { AdminService } from '../admin/admin.service';

export class AuthService {
  private static instance: AuthService;
  private userService: UserService;
  private tokenUtil: TokenUtil;
  private userRepository: UserRepository;
  private cacheManager: CacheManagerUtil;
  private adminService: AdminService;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    this.userService = new UserService();
    this.adminService = new AdminService();
    this.tokenUtil = new TokenUtil();
    this.userRepository = getCustomRepository(UserRepository);
    this.cacheManager = new CacheManagerUtil(RedisConfig.client);
    AuthService.instance = this;
  }

  async socialLink(res: Response, social: string) {
    let link: string;
    switch (social) {
      case AppObject.GRANT_TYPES.FACEBOOK:
      default:
        link = `https://www.facebook.com/v15.0/dialog/oauth?${qs.stringify({
          client_id: '2959728634319670',
          redirect_uri: 'http://localhost:5173/?grantType=facebook',
          scope: ['public_profile'].join(','),
          response_type: 'code',
        })}`;
        break;
    }
    return res.redirect(link);
  }

  async login(params: { body: LoginParams }): Promise<SignTokenResponse> {
    let userFound: UserModel;

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
      // case AppObject.GRANT_TYPES.GOOGLE: {
      //   break;
      // }
      default: {
        userFound = await this.userService.getUserByConditions({
          conditions: { email: params.body.email },
          select: ['id', 'password', 'status'],
        });

        if (!(await userFound.comparePassword(params.body.password))) {
          throw new ErrorHandler({ message: 'wrongPassword' });
        }
        break;
      }
    }

    return this._signToken({ id: userFound.id });
  }

  async adminLogin(params: {
    body: AdminLoginParams;
  }): Promise<SignTokenResponse> {
    const admin: AdminModel = await this.adminService.login(params.body);
    return this._signToken({ id: admin.id });
  }

  async resendOtp(params: { body: VerifyAccount }): Promise<any> {
    const userFound = await this.userService.detailByConditions({
      conditions: { email: params.body.email },
      select: ['status', 'id'],
    });

    if (!userFound) {
      throw new ErrorHandler({ message: 'userNotFound' });
    }

    if (userFound.status !== AppObject.USER_STATUS.UNVERIFIED) {
      throw new ErrorHandler({ message: 'accountVerified' });
    }

    const otpDoc = await this.cacheManager.getKey(
      `caches:users:${userFound.id}:verify-account`
    );

    const times: number = otpDoc ? JSON.parse(otpDoc).times : 0;

    if (times + 1 > 5) {
      throw new ErrorHandler({ message: 'limitResendOtp' });
    }

    await this.cacheManager.setKey({
      key: `caches:users:${userFound.id}:verify-account`,
      value: JSON.stringify({
        otp: StringUtil.randomNumber(6),
        times: times + 1,
      }),
      exp: 3 * 60,
    });

    return { isSuccess: 1 };
  }

  async verify(params: { body: VerifyAccount }): Promise<any> {
    const userFound = await this.userService.detailByConditions({
      conditions: { email: params.body.email },
      select: ['id', 'status'],
    });

    if (!userFound) {
      throw new ErrorHandler({ message: 'userNotFound' });
    }

    if (userFound.status !== AppObject.USER_STATUS.UNVERIFIED) {
      throw new ErrorHandler({ message: 'accountVerified' });
    }

    const otpDoc = await this.cacheManager.getKey(
      `caches:users:${userFound.id}:verify-account`
    );

    if (!otpDoc || JSON.parse(otpDoc).otp !== params.body.otp) {
      throw new ErrorHandler({ message: 'otpInvalid' });
    }

    this.userRepository.updateByConditions({
      conditions: { id: userFound.id },
      data: { status: AppObject.COMMON_STATUS.ACTIVE },
    });

    return this._signToken({ id: userFound.id });
  }

  async register(params: RegisterParams) {
    const user = await this.userService.create(params);
    await this.cacheManager.setKey({
      key: `caches:users:${user.id}:verify-account`,
      value: JSON.stringify({ otp: StringUtil.randomNumber(6), times: 1 }),
      exp: 3 * 60,
    });

    return;
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
        headers: { Authorization: `Bearer ${data.access_token}` },
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
