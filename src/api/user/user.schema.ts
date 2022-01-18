import { model, Schema } from 'mongoose';
import { AppObject } from '../../common/consts';
import { StringUtil } from '../../utils';
import { IUser } from './user.interface';

const UserSchema: Schema = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: {
    dialCode: { type: String },
    phone: { type: String },
  },
  password: String,
  salt: String,
  status: { type: String },
});

UserSchema.pre('save', async function (next) {
  let user: IUser;
  if (true) {
    user = this;
  }
  // if (!this.isModified('password')) {
  //   return next();
  // }
  if (!user.salt) {
    user.salt = StringUtil.random();
  }
  user.password = StringUtil.encrypt(user.password, user.salt);
  return next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return password === StringUtil.decrypt(this.password, this.salt);
};

export const User = model<IUser>(AppObject.MODULES.USER, UserSchema);
