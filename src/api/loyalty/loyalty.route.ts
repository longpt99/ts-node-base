import { expressRouter, router, validate } from '../../common';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyValidation } from './loyalty.validation';

const loyaltyController = new LoyaltyController();

//#region Admin section
router.get('/admin/loyalties', [
  loyaltyController.create.bind(loyaltyController),
]);

router.post('/admin/loyalties', [
  validate(LoyaltyValidation.create, ['body', 'params', 'query']),
  loyaltyController.create.bind(loyaltyController),
]);

router.patch('/admin/loyalties/:id', [
  loyaltyController.create.bind(loyaltyController),
]);

router.delete('/admin/loyalties/:id', [
  loyaltyController.create.bind(loyaltyController),
]);
//#endregion Admin section

//#region User section
router.get('/loyalty', [loyaltyController.list.bind(loyaltyController)]);
//#endregion User section

export default expressRouter;
