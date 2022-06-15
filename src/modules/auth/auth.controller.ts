import { Request, Response } from 'express';
import { SignTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  //#region Admin section
  async adminLogin(req: Request, res: Response) {
    return res.result(this.authService.adminLogin(req.body));
  }
  //#endregion Admin section

  //#region User section
  async login(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.result(this.authService.login({ body: req.body, res: res }));
  }

  async refreshToken(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.result(
      this.authService.refreshToken({
        res: res,
        refreshToken: req.signedCookies.refreshToken,
      })
    );
  }

  async loginFacebook(req: Request, res: Response) {
    return res.result(this.authService.loginFacebook(req.query));
  }

  async loginGoogle(req: Request, res: Response) {
    return res.result(this.authService.loginGoogle(req.query));
  }

  async register(req: Request, res: Response) {
    return res.result(this.authService.register(req.body));
  }

  async logout(req: Request, res: Response) {
    return res.result(this.authService.logout(res, req.user));
  }
  //#endregion User section
}
