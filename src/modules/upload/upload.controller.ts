import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import UploadService from './upload.service';

export default class UploadController {
  private readonly uploadService = new UploadService();
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
  }

  private _initializeRoutes() {
    this.router.post('/upload', [this.upload.bind(this)]);
  }

  //#region Admin section
  async upload(req: Request, res: Response) {
    return this.uploadService.upload(req, res);
  }
}
