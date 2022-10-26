import { TokenModel } from '../../interfaces';

declare module 'express' {
  interface Request {
    user: TokenModel;
  }

  interface Response {
    success;
    error;
    handler;
  }
}
