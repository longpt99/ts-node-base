import { MongooseRepository } from '../../common/extensions';
import { IUser } from './user.interface';
import { User } from './user.schema';

class UserRepository extends MongooseRepository<IUser> {
  constructor() {
    super(User);
  }
}

export default new UserRepository();
