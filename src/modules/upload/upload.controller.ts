import { Request, Response } from 'express';
import { router } from '../../common';
import UploadService from './upload.service';

export default class UploadController {
  private readonly uploadService = new UploadService();
  private readonly router = router;

  constructor() {
    this._initializeRoutes();
  }

  private _initializeRoutes() {
    this.router.post('/upload', [this.upload.bind(this)]);
  }

  //#region Admin section
  async upload(req: Request, res: Response): Promise<any> {
    console.log(123);

    return this.uploadService.upload(req, res);
  }
}
