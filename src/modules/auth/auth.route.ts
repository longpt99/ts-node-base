import { validate } from '../../common';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { expressRouter, router } from '../../libs';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controllers';

const authController = new AuthController();

//#region Admin section
router.post('/admin/auth/login', [
  authController.adminLogin.bind(authController),
]);
//#endregion Admin section

//#region User section
router.post('/auth/login', [authController.login.bind(authController)]);

router.get('/auth/refresh-token', [
  authController.refreshToken.bind(authController),
]);

router.get('/auth/facebook', [
  authController.loginFacebook.bind(authController),
]);

router.get('/auth/google', [authController.loginGoogle.bind(authController)]);

router.post('/auth/register', [
  validate(UserValidation.register, ['body']),
  authController.register.bind(authController),
]);

router.get('/auth/logout', [
  authMiddleware,
  authController.logout.bind(authController),
]);

//#endregion User section

export default expressRouter;
