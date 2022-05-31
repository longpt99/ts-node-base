import { Application, Request, Response } from 'express';
import { sync } from 'glob';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import { AppConst } from '../common/consts';
import { logger } from '../utils';
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
        logger.info(
          `[Router] ${layer.route.stack[0].method.toUpperCase()}: "/${
            AppConst.API_PREFIX
          }/${AppConst.API_VERSION}${layer.route.path}" has been registered!`
        );
      }
      return route;
    })
  );

  app.use((req: Request, res: Response) => {
    return res.status(404).error();
  });
};
