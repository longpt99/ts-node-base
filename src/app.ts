import { green } from 'chalk';
import express, { Application } from 'express';
import path, { join } from 'path';
import { success } from 'signale';
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
    // this.app.use(express.static(join(__dirname, './assets/html')));
    routeConfig(this.app);
    serverConfig();

    this.app.use(function (req, res) {
      return res.sendFile(
        path.normalize(__dirname + '/assets/html/not-found.html')
      );
    });

    this.app.listen(APP_CONFIG.ENV.APP.PORT, () => {
      success(green(`Server is listening on ${APP_CONFIG.ENV.APP.PORT}`));
    });
  }
}

export default new Server();
