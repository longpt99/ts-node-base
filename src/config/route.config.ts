import { green } from 'chalk';
import { Application } from 'express';
import { sync } from 'glob';
import { join } from 'path';
import { success } from 'signale';
import swaggerUi from 'swagger-ui-express';
import { AppConst } from '../common/consts';
import swaggerConfig from './swagger.config';

export const routeConfig = async (app: Application): Promise<void> => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerConfig, { explorer: true })
  );

  const routes = sync(join(__dirname, '../api/**/**.route.{js,ts}'));
  app.use(
    `/${AppConst.API_PREFIX}/${AppConst.API_VERSION}`,
    routes.map((path) => {
      const route = require(path).default;
      for (const layer of route.stack) {
        success(
          green(
            `[Router] ${layer.route.stack[0].method.toUpperCase()}: "/${
              AppConst.API_PREFIX
            }/${AppConst.API_VERSION}${layer.route.path}" has been registered!`
          )
        );
      }
      return route;
    })
  );
};
