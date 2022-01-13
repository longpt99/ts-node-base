import { green } from 'chalk';
import { Express } from 'express';
import { sync } from 'glob';
import { join } from 'path';
import { success } from 'signale';
import swaggerUi from 'swagger-ui-express';
import { AppConst } from '../common/consts';
import swaggerConfig from './swagger.config';

export const routeConfig = async (app: Express): Promise<void> => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerConfig, { explorer: true })
  );
  const routes = sync(join(__dirname, '../api/**/**.route.{js,ts}'));
  app.use(
    `/${AppConst.API_PREFIX}/${AppConst.API_VERSION}`,
    routes.map(
      (route) => require(route.replace(join(__dirname, '..'), '..')).default
    )
  );

  // Route registered
  const routeRegistered = [];
  app._router.stack.forEach((layer) => {
    if (layer.route) {
      // routes registered directly on the app
      routeRegistered.push(layer.route);
    } else if (layer.name === 'router') {
      // router layer
      layer.handle.stack.forEach((handler) => {
        handler.route && routeRegistered.push(handler.route);
      });
    }
  });
  routeRegistered.forEach((route) =>
    success(
      green(
        `Router ${route.stack[0].method.toUpperCase()}: "/${
          AppConst.API_PREFIX
        }/${AppConst.API_VERSION}${route.path}" has been registered!`
      )
    )
  );
};
