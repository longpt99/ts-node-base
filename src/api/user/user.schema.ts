import { Schema, model, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

export interface IUser extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const User = model<IUser>('User', UserSchema);
