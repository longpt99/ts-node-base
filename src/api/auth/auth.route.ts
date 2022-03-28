import { expressRouter, router, validate } from '../../common';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { UserValidation } from '../user/user.validation';
import authController from './auth.controller';

//#region Admin section
router.post('/admin/auth/login', [authController.adminLogin]);
//#endregion Admin section

//#region User section
router.post('/auth/login', [authController.login]);

router.get('/auth/facebook', [authController.loginFacebook]);

router.get('/auth/google', [authController.loginGoogle]);

router.post('/auth/register', [
  validate(UserValidation.register, ['body']),
  authController.register,
]);

router.post('/auth/logout', [authMiddleware, authController.logout]);
//#endregion User section

export default expressRouter;
