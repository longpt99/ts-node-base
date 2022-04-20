import express, { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import 'newrelic';
import { NetworkInterfaceInfo, networkInterfaces } from 'os';
import { IServer } from './common/interfaces/app.interface';
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

    const server: HttpServer = createServer(this.app);
    server.listen(APP_CONFIG.ENV.APP.PORT, () => {
      const { port } = server.address() as AddressInfo;
      const ip = (Object.values(networkInterfaces()) as any)
        .flat()
        .filter(
          (item: NetworkInterfaceInfo) =>
            !item.internal && item.family === 'IPv4'
        )
        .find(Boolean).address;

      logger.info(`[System] Server is running at ${ip}:${port}`);
    });
  }
}

export default new Server();
