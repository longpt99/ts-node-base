import { route, router } from '../../common';
import authController from './auth.controller';

//#region Admin section
route.post('/admin/auth/login', [authController.adminLogin]);
//#endregion Admin section

//#region User section
route.post('/auth/login', [authController.login]);

route.post('/auth/register', [authController.register]);
//#endregion User section

export default router;
