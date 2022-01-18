import { green } from 'chalk';
import express from 'express';
import { success } from 'signale';
import { bootstrapConfig, expressConfig, routeConfig } from './config';
import APP_CONFIG from './config/app.config';
import { databaseConnect } from './config/databases/database';

const app = express();
bootstrapConfig();
databaseConnect();
expressConfig(app);
app.get('/', (req, res) => {
  res.send('Hello');
});
routeConfig(app);

app.listen(APP_CONFIG.APP.PORT, () => {
  success(green(`Server is listening on ${APP_CONFIG.APP.PORT}`));
});
