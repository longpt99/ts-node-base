import { green } from 'chalk';
import express, { Application } from 'express';
import { join } from 'path';
import { success } from 'signale';
import { bootstrapConfig, expressConfig, routeConfig } from './config';
import APP_CONFIG from './config/app.config';
import serverConfig from './config/server.config';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public start() {
    bootstrapConfig();
    expressConfig(this.app);
    this.app.use(express.static(join(__dirname, '../public')));
    routeConfig(this.app);

    process.on('SIGHUP', function () {
      console.log('Here');

      process.exit();
    });

    serverConfig();

    const server = this.app.listen(APP_CONFIG.ENV.APP.PORT, () => {
      success(green(`Server is listening on ${APP_CONFIG.ENV.APP.PORT}`));
    });
  }
}

export default new Server();
