import { expressRouter, router, validate } from '../../common';
import loyaltyController from './loyalty.controller';
import { LoyaltyValidation } from './loyalty.validation';

//#region Admin section
router.get('/admin/loyalties', [loyaltyController.create]);

router.post('/admin/loyalties', [
  validate(LoyaltyValidation.create, ['body', 'params', 'query']),
  loyaltyController.create,
]);

router.patch('/admin/loyalties/:id', [loyaltyController.create]);

router.delete('/admin/loyalties/:id', [loyaltyController.create]);
//#endregion Admin section

//#region User section
router.get('/loyalty', [loyaltyController.list]);
//#endregion User section

export default expressRouter;
