import { getCustomRepository } from 'typeorm';
import { ErrorHandler } from '../../common/error';
import { FacebookData } from '../auth/auth.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async detailByConditions(params: any): Promise<User> {
    return this.userRepository.findOne(params);
  }

  async getUserByConditions(params: any): Promise<User> {
    const userFound = await this.detailByConditions(params);

    if (!userFound) {
      throw new ErrorHandler({ message: 'userNotFound' });
    }

    return userFound;
  }

  async getUserByFacebookId(data: FacebookData): Promise<User> {
    const userFound = await this.detailByConditions({
      where: { facebookId: data.id },
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
}

export default new UserService();
