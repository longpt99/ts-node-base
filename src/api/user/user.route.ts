import { route, router } from '../../common';
import { validate } from '../../common/middlewares';
import userController from './user.controller';
import { UserValidation } from './user.validation';

//#region Admin section
route.get('/admin/user', [userController.create]);

route.post('/admin/user', [userController.create]);

route.get('/admin/user/:id', [userController.getById]);

route.patch('/admin/user/:id', [userController.create]);

route.delete('/admin/user/:id', [userController.create]);
//#endregion Admin section

//#region User section
route.get('/user/profile', [userController.list]);

route.patch('/user/profile/:id', [
  validate(UserValidation.createUser),
  userController.create,
]);
//#endregion User section

export default router;
