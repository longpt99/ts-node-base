import { expressRouter, router } from '../../libs';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { UserController } from './user.controllers';

const userController = new UserController();

//#region Admin section
router.post('/admin/users', [userController.create.bind(userController)]);

router.get('/admin/users', [userController.create.bind(userController)]);

router.get('/admin/users/:id', [userController.getById.bind(userController)]);

router.patch('/admin/users/:id', [userController.create.bind(userController)]);

router.delete('/admin/users/:id', [userController.create.bind(userController)]);
//#endregion Admin section

//#region User section
router.get('/profile', [
  authMiddleware,
  userController.getProfile.bind(userController),
]);

router.patch('/profile/:id', [userController.create.bind(userController)]);
//#endregion User section

export default expressRouter;
