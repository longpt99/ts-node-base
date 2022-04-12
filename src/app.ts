import { green } from 'chalk';
import { success } from 'signale';
import express, { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import 'newrelic';
import { IServer } from './common/interfaces/app.interface';
import { errorHandler } from './common/middlewares';
import { bootstrapConfig, expressConfig, routeConfig } from './config';
import APP_CONFIG from './config/app.config';
import serverConfig from './config/server.config';
import { logger } from './utils';

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

    const server: HttpServer = createServer(this.app);
    server.listen(APP_CONFIG.ENV.APP.PORT, () => {
      const { address, port } = server.address() as AddressInfo;
      logger.info(`[System] Server is running at ${address}:${port}`);
    });
  }
}

export default new Server();
