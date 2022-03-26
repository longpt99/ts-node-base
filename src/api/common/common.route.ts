import { expressRouter, router } from '../../common';
import commonController from './common.controller';

//#region Common section
router.patch('/lang/:lang', [commonController.changeLang]);
//#endregion Common section

export default expressRouter;
