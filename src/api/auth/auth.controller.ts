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
    return res.result(authService.login({ body: req.body, res: res }));
  }

  async loginFacebook(req: Request, res: Response) {
    return res.result(authService.loginFacebook(req.query));
  }

  async loginGoogle(req: Request, res: Response) {
    return res.result(authService.loginGoogle(req.query));
  }

  async register(req: Request, res: Response) {
    return res.result(authService.register(req.body));
  }

  async logout(req: Request, res: Response) {
    return res.result(authService.logout(res));
  }
  //#endregion User section
}

export default new AuthController();
