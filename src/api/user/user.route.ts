import { Router } from 'express';
import * as userController from './user.controller';

const router = Router();

router.get('/user', userController.create);

router.post('/user', userController.create);

router.get('/user/:id', userController.create);

router.patch('/user/:id', userController.create);

router.delete('/user/:id', userController.create);

export default router;
