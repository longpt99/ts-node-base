import 'newrelic';
import express, { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { NetworkInterfaceInfo, networkInterfaces } from 'os';
import { IServer } from './common/interfaces/app.interface';
import { bootstrapConfig, expressConfig, routeConfig } from './config';
import APP_CONFIG from './config/app.config';
import { logger } from './utils';

export default class Server implements IServer {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public start() {
    bootstrapConfig();
    expressConfig(this.app);
    routeConfig(this.app);
    // serverConfig();

    const server: HttpServer = createServer(this.app);
    server.listen(APP_CONFIG.ENV.APP.PORT, () => {
      const ip = (Object.values(networkInterfaces()) as any)
        .flat()
        .find(
          (item: NetworkInterfaceInfo) =>
            !item.internal && item.family === 'IPv4'
        ).address;
      logger.info(
        `[System] Server is running at ${ip}:${APP_CONFIG.ENV.APP.PORT}`
      );
    });
  }
}
