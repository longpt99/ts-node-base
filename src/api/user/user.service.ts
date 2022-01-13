import { ErrorHandler } from '../../common/error';
import { TokenUtil } from '../../utils';
import { UserRepository } from './user.repository';
import { IUser } from './user.schema';

export default class UserService {
  private userRepository: UserRepository;
  private tokenUtil: TokenUtil;

  constructor() {
    this.userRepository = new UserRepository();
    this.tokenUtil = new TokenUtil();
  }

  async create(params): Promise<IUser> {
    return this.userRepository.create(params);
    // throw new ErrorHandler({ message: 'Test', status: 400 });
  }

  async signIn(params) {
    const accessToken = await this.tokenUtil.signToken(params);
  }

  async getById() {
    return '123123123';
  }

  async list() {
    throw new ErrorHandler({ message: '1235544' });
  }
}
