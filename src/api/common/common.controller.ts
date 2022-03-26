import { Request, Response } from 'express';
import userService from './common.service';

class CommonController {
  constructor() {}

  //#region Common section
  async changeLang(req: Request, res: Response) {
    return res.result(
      userService.changeLang({ lang: req.params.lang, res: res })
    );
  }

  //#endregion Common section
}

export default new CommonController();
