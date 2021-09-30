import { Router } from 'express';
import AdminController from './admin.controller';

const router = Router();
const adminController = new AdminController();

router.get('/admin', adminController.create.bind(adminController));

router.post('/admin', adminController.create);

router.get('/admin/:id', adminController.create);

router.patch('/admin/:id', adminController.create);

router.delete('/admin/:id', adminController.create);

export default router;
