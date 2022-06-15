import { expressRouter, router } from '../../common';
import { HealthController } from './health.controller';

const healthController = new HealthController();

//#region Admin section
router.get('/healths/ping', [healthController.ping.bind(healthController)]);

export default expressRouter;
