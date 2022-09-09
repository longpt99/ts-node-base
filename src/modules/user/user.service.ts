import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import { ParamsCommonList } from '../../common/interfaces';
import { ErrorHandler } from '../../libs/errors';
import { FacebookData } from '../auth/auth.interface';
import { User } from './user.entity';
import { UserModel } from './user.interface';
import { UserRepository } from './user.repository';

export class UserService {
  private static instance: UserService;
  private userRepository: UserRepository;

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }

    this.userRepository = getCustomRepository(UserRepository);
    UserService.instance = this;
  }

  async detailByConditions(params: ParamsCommonList): Promise<UserModel> {
    return this.userRepository.detailByConditions(params);
  }

  async getUserByConditions(params: ParamsCommonList): Promise<UserModel> {
    const userFound = await this.detailByConditions(params);

    if (!userFound) {
      throw new ErrorHandler({ message: 'userNotFound' });
    }

    if (userFound.status === AppObject.COMMON_STATUS.UNVERIFIED) {
      throw new ErrorHandler({ message: 'accountUnverified' });
    }

    if (userFound.status === AppObject.COMMON_STATUS.INACTIVE) {
      throw new ErrorHandler({ message: 'accountInactive' });
    }

    return userFound;
  }

  async getUserByFacebookId(data: FacebookData): Promise<UserModel> {
    const userFound = await this.detailByConditions({
      conditions: { facebookId: data.id },
      select: ['id'],
    });

    if (!userFound) {
      // userFound = await this.userRepository.save(
      //   this.userRepository.create({
      //     facebookId: data.id,
      //     firstName: data.first_name,
      //     lastName: data.last_name,
      //     status: AppObject.COMMON_STATUS.ACTIVE,
      //   })
      // );
    }

    return userFound;
  }

  async create(params) {
    try {
      const userCreated = await this.userRepository.save(
        this.userRepository.create(params)
      );
      return userCreated;
    } catch (error) {
      if (error.code === AppObject.ERR_CODE_DB.UNIQUE) {
        throw new ErrorHandler({ message: 'phoneNumberExists' });
      }
      throw error;
    }
  }

  async getById() {}

  async list() {}

  async getProfile(userId) {
    return this.getUserByConditions({ conditions: { id: userId } });
  }
}
