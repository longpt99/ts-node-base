import { green } from 'chalk';
import express, { Application } from 'express';
import { success } from 'signale';
import { errorHandler } from './common/middlewares';
import { bootstrapConfig, expressConfig, routeConfig } from './config';
import APP_CONFIG from './config/app.config';
import serverConfig from './config/server.config';

export interface IServer {
  start(): void;
}

class Server implements IServer {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public start() {
    bootstrapConfig();
    expressConfig(this.app);
    routeConfig(this.app);
    serverConfig();

    this.app.use(errorHandler);
    this.app.listen(APP_CONFIG.ENV.APP.PORT, () => {
      success(green(`Server is listening on ${APP_CONFIG.ENV.APP.PORT}`));
    });
  }
}

export default new Server();
