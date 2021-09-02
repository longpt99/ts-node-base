import { ErrorHandler } from '../../common/error/error.handler';

export default class AdminService {
  constructor() {}

  async create() {
    throw new ErrorHandler({ message: 'Test', status: 400 });
  }
}
