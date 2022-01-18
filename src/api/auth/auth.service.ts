import { AppObject } from '../../common/consts';
import { ErrorHandler } from '../../common/error';
import { TokenUtil } from '../../utils';
import userRepository from '../user/user.repository';

class AuthService {
  constructor() {}

  async login(params) {
    const userFound = await userRepository.detailByConditions({
      conditions: {
        email: params.email,
        status: { $ne: AppObject.COMMON_STATUS.DELETED },
      },
    });

    if (!userFound) {
      throw new ErrorHandler({ message: 'accountNotFound' });
    }

    if (userFound.status === AppObject.COMMON_STATUS.IN_ACTIVE) {
      throw new ErrorHandler({ message: 'accountInactive' });
    }

    if (!(await userFound.comparePassword(params.password))) {
      throw new ErrorHandler({ message: 'wrongPassword' });
    }

    return {
      accessToken: await TokenUtil.signToken(userFound),
    };
  }

  async register(params) {}

  async adminLogin(params) {}
}

export default new AuthService();
