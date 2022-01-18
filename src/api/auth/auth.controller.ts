import { Request, Response } from 'express';
import authService from './auth.service';

class AuthController {
  constructor() {}

  //#region Admin section
  async adminLogin(req: Request, res: Response) {
    return res.result(authService.adminLogin(req.body));
  }
  //#endregion Admin section

  //#region User section
  async login(req: Request, res: Response) {
    return res.result(authService.login(req.body));
  }

  async register(req: Request, res: Response) {
    return res.result(authService.register(req.body));
  }
  //#endregion User section
}

export default new AuthController();
