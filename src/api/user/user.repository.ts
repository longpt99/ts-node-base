import { MongooseRepository } from '../../common/extensions';
import { IUser, User } from './user.schema';

export class UserRepository extends MongooseRepository<IUser> {
  constructor() {
    super(User);
  }
}
