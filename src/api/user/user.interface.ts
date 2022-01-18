import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  phoneNumber: {
    dialCode: string;
    phone: string;
    fullPhone: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
  status: string;
  comparePassword: (password: string) => Promise<boolean>;
}
