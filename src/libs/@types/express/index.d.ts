import 'express';
import { TokenModel } from '../../interfaces';

declare global {
  namespace Express {
    interface Request {
      user: TokenModel;
    }

    interface Response {
      success: any;
      error: any;
      handler: any;
    }
  }
}
