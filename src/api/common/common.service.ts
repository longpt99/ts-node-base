import { Response } from 'express';
import i18n from '../../config/i18n.config';
import { LocaleService } from '../../libs';

class CommonService {
  private localeService: LocaleService;

  constructor() {
    // this.localeService = ;
  }

  //#region Common section
  async changeLang(params: { lang: string; res: Response }) {
    params.res.cookie('lang', params.lang);
    i18n.setLocale(params.lang);
    return { isSuccess: true };
  }

  //#endregion Common section
}

export default new CommonService();
