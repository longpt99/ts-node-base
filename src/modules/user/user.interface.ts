// export interface IUser extends Document {
//   _id: string;
//   phoneNumber: {
//     dialCode: string;
//     phone: string;
//     fullPhone: string;
//   };
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   salt: string;
//   status: string;
//   comparePassword: (password: string) => Promise<boolean>;
// }

import { User } from './user.entity';

export type UserModel = User;

export interface RegisterAccount {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface PhoneNumberProperties {
  phone: string;
  dialCode: string;
}
