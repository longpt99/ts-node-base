import { ErrorHandler } from '../../common/error';
import { IUser } from './user.interface';
import userRepository from './user.repository';

class UserService {
  constructor() {}

  async create(params): Promise<IUser> {
    const emailExists = await userRepository.countByConditions({
      email: params.email,
    });
    if (emailExists > 0) {
      throw new ErrorHandler({ message: 'emailExits' });
    }
    return userRepository.create(params);
  }

  async getById() {}

  async list() {}
}

export default new UserService();
