import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import { ParamsCommonGetDetail } from '../../common/interfaces';
import RedisConfig from '../../configs/databases/redis.config';
import { ErrorHandler } from '../../libs/errors';
import { CacheManagerUtil } from '../../utils/cache-manager.util';
import { FacebookData, RegisterParams } from '../auth/auth.interface';
import { UserModel } from './user.interface';
import { UserRepository } from './user.repository';

export class UserService {
  private static instance: UserService;
  private userRepository: UserRepository;
  private cacheManager: CacheManagerUtil;

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }

    this.userRepository = getCustomRepository(UserRepository);
    this.cacheManager = new CacheManagerUtil(RedisConfig.client);

    UserService.instance = this;
  }

  async detailByConditions(
    params: ParamsCommonGetDetail<UserModel>
  ): Promise<UserModel> {
    return this.userRepository.detailByConditions(params);
  }

  async getUserByConditions(
    params: ParamsCommonGetDetail<UserModel>
  ): Promise<UserModel> {
    const userFound = await this.detailByConditions(params);
    if (!userFound) {
      throw new ErrorHandler({ message: 'userNotFound' });
    }

    if (userFound.status === AppObject.USER_STATUS.UNVERIFIED) {
      throw new ErrorHandler({ message: 'accountUnverified' });
    }

    if (userFound.status === AppObject.USER_STATUS.INACTIVE) {
      throw new ErrorHandler({ message: 'accountInactive' });
    }

    return userFound;
  }

  async getUserByFacebookId(data: FacebookData): Promise<UserModel> {
    let userFound = await this.detailByConditions({
      conditions: { facebookId: data.id },
      select: ['id'],
    });

    if (!userFound) {
      userFound = await this.userRepository.save({
        facebookId: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        status: AppObject.USER_STATUS.ACTIVE,
      });
    }

    return userFound;
  }

  async create(params: RegisterParams) {
    try {
      const userCreated = await this.userRepository.createDoc(params);
      return userCreated;
    } catch (error) {
      if (error.code === AppObject.ERR_CODE_DB.UNIQUE) {
        throw new ErrorHandler({ message: 'emailExists' });
      }
      throw error;
    }
  }

  async getById() {}

  async list() {}

  async getProfile(userId: string) {
    return this.getUserByConditions({ conditions: { id: userId } });
  }
}
