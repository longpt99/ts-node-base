import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import { ErrorHandler } from '../../common/error';
import { ParamsCommonList } from '../../common/interfaces';
import { FacebookData } from '../auth/auth.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async detailByConditions(params: ParamsCommonList): Promise<User> {
    return this.userRepository.detailByConditions(params);
  }

  async getUserByConditions(params: ParamsCommonList): Promise<User> {
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

  async getUserByFacebookId(data: FacebookData): Promise<User> {
    const userFound = await this.detailByConditions({
      conditions: { facebookId: data.id },
    });

    if (!userFound) {
      console.log(123);
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

export default new UserService();
