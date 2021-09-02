import { green } from 'chalk';
import express from 'express';
import { success } from 'signale';
import { AppConst } from './common/consts';
import { bootstrapConfig, expressConfig, routeConfig } from './config';

const app = express();

const port = AppConst.PORT || 3000;

bootstrapConfig();
expressConfig(app);
routeConfig(app);

app.listen(port, () => {
  success(green(`Server is listening on ${port}`));
});
