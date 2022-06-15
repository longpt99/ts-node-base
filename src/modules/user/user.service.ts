import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import { ParamsCommonList } from '../../common/interfaces';
import { ErrorHandler } from '../../libs/error';
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
    let userFound = await this.detailByConditions({
      conditions: { facebookId: data.id },
      select: ['id'],
    });

    if (!userFound) {
      userFound = await this.userRepository.save(
        this.userRepository.create({
          facebookId: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          status: AppObject.COMMON_STATUS.ACTIVE,
        })
      );
    }

    return userFound;
  }

  async create(params) {
    const emailExists = await this.userRepository.count({
      where: { email: params.email },
    });

    if (emailExists > 0) {
      throw new ErrorHandler({ message: 'emailExists' });
    }

    const user = new User();
    user.email = params.email;
    user.password = params.password;
    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }

  async getById() {}

  async list() {}

  async getProfile(userId) {
    return this.getUserByConditions({ conditions: { id: userId } });
  }
}
