import { Request, Response } from 'express';
import { validate } from '../../common';
import { RouteConfig } from '../../libs';
import { SignTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthValidation } from './auth.validation';

export default class AuthController {
  private authService = new AuthService();
  private readonly router = RouteConfig;
  private readonly adminPath = '/admin/auth';
  private readonly userPath = '/auth';

  constructor() {
    this._initializeRoutes();
  }

  private _initializeRoutes() {
    //#region Admin section
    this.router.post(`${this.adminPath}/login`, [this.adminLogin.bind(this)]);
    //#endregion Admin section

    //#region User section
    this.router.get(`${this.userPath}/login/socials/:social`, [
      this.socialLink.bind(this),
    ]);

    this.router.post(`${this.userPath}/login`, [this.login.bind(this)]);

    this.router.post(`${this.userPath}/register`, [
      validate(AuthValidation.register),
      this.register.bind(this),
    ]);

    this.router.post(`${this.userPath}/verify-account/resend`, [
      validate(AuthValidation.resendVerifyAccount),
      this.resendOtp.bind(this),
    ]);

    this.router.post(`${this.userPath}/verify-account`, [
      validate(AuthValidation.verifyAccount),
      this.verify.bind(this),
    ]);

    this.router.post(`${this.userPath}/refresh`, [
      this.refreshToken.bind(this),
    ]);

    this.router.post(`${this.userPath}/logout`, [this.logout.bind(this)]);
  }

  //#region Admin section
  async adminLogin(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.handler(this.authService.adminLogin({ body: req.body }));
  }
  //#endregion Admin section

  //#region User section
  async socialLink(req: Request, res: Response) {
    return this.authService.socialLink(res, req.params.social);
  }

  async login(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.handler(this.authService.login({ body: req.body }));
  }

  async verify(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.handler(this.authService.verify({ body: req.body }));
  }

  async resendOtp(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.handler(this.authService.resendOtp({ body: req.body }));
  }

  async refreshToken(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.handler(this.authService.refreshToken(req.body.refreshToken));
  }

  async register(req: Request, res: Response) {
    return res.handler(this.authService.register(req.body));
  }

  async logout(req: Request, res: Response) {
    return res.handler(this.authService.logout(req.user.id));
  }
  //#endregion User section
}
