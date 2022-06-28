import { Application, Request, Response } from 'express';
import { sync } from 'glob';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import { expressRouter } from '../common';
import { AppConst } from '../common/consts';
import { logger } from '../utils';
import swaggerConfig from './swagger.config';

export const routeConfig = async (app: Application): Promise<void> => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerConfig, { explorer: true })
  );

  app.use(
    `/${AppConst.API_PREFIX}/${AppConst.API_VERSION}`,
    (() => {
      sync(join(__dirname, '../modules/**/**.controller.[tj]s')).forEach(
        (path) => new (require(path).default)()
      );
      expressRouter.stack.forEach((layer) => {
        logger.info(
          `[Router] ${layer.route.stack[0].method.toUpperCase()}: "/${
            AppConst.API_PREFIX
          }/${AppConst.API_VERSION}${layer.route.path}" has been registered!`
        );
      });
      return expressRouter;
    })()
  );
  app.use((_req: Request, res: Response) => {
    return res.status(404).error();
  });
};
