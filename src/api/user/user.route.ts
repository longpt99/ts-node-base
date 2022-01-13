import { validationMiddleware } from '../../common/middlewares';
import { CreateUserValidation } from './validations';
import UserController from './user.controller';
import { route, router } from '../../common';

const userController = new UserController();

route.get('/user', userController.list.bind(userController));

route.post(
  '/user',
  validationMiddleware(CreateUserValidation),
  userController.create.bind(userController)
);

route.get('/user/:id', userController.getById.bind(userController));

route.patch('/user/:id', userController.create.bind(userController));

route.delete('/user/:id', userController.create.bind(userController));

export default router;
