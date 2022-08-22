import express, { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
// import 'newrelic';
import { NetworkInterfaceInfo, networkInterfaces } from 'os';
import { AppConst } from './common/consts';
import { IServer } from './common/interfaces/app.interface';
import { bootstrapConfig, expressConfig, routeConfig } from './config';
import APP_CONFIG from './config/app.config';
import serverConfig from './config/server.config';
import { RouteConfig } from './libs';
import { logger } from './utils';

export default class Server implements IServer {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public start() {
    const server: HttpServer = createServer(this.app);
    RouteConfig.globalPrefix = `/${AppConst.API_PREFIX}/${AppConst.API_VERSION}`;

    bootstrapConfig();
    expressConfig(this.app);
    routeConfig(this.app);
    serverConfig(server);

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
