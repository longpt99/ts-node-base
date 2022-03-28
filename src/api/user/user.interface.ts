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

export interface UserModel {
  dialCode: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterAccount {
  email: string;
  password: string;
}
