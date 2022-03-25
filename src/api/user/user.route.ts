import { expressRouter, router } from '../../common';
import { validate } from '../../common/middlewares';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import userController from './user.controller';
import { UserValidation } from './user.validation';

//#region Admin section
router.post('/admin/users', [userController.create]);

router.get('/admin/users', [userController.create]);

router.get('/admin/users/:id', [userController.getById]);

router.patch('/admin/users/:id', [userController.create]);

router.delete('/admin/users/:id', [userController.create]);
//#endregion Admin section

//#region User section
router.get('/profile', [authMiddleware, userController.getProfile]);

router.patch('/profile/:id', [
  validate(UserValidation.createUser),
  userController.create,
]);
//#endregion User section

export default expressRouter;
