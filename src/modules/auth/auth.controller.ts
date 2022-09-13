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

    //#region User section
    this.router.post(`${this.userPath}/login`, [this.login.bind(this)]);
    this.router.post(`${this.userPath}/register`, [
      validate(AuthValidation.register),
      this.register.bind(this),
    ]);

    this.router.post(`${this.userPath}/refresh-token`, [
      this.refreshToken.bind(this),
    ]);

    this.router.post(`${this.userPath}/logout`, [this.logout.bind(this)]);
  }

  //#region Admin section
  async adminLogin(req: Request, res: Response) {
    return res.handler(this.authService.adminLogin(req.body));
  }
  //#endregion Admin section

  //#region User section
  async login(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.handler(this.authService.login({ body: req.body, res: res }));
  }

  async refreshToken(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.handler(this.authService.refreshToken(req.body.refreshToken));
  }

  async loginFacebook(req: Request, res: Response) {
    return res.handler(this.authService.loginFacebook(req.query));
  }

  async loginGoogle(req: Request, res: Response) {
    return res.handler(this.authService.loginGoogle(req.query));
  }

  async register(req: Request, res: Response) {
    return res.handler(this.authService.register(req.body));
  }

  async logout(req: Request, res: Response) {
    return res.handler(this.authService.logout(req.user.id));
  }
  //#endregion User section
}