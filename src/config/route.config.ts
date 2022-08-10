import { Application, Request, Response } from 'express';
import globSync from 'glob/sync';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import { expressRouter } from '../common';
import { AppConst } from '../common/consts';
import { logger } from '../utils';

export const routeConfig = async (app: Application): Promise<void> => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(require(join(process.cwd(), './doc/swagger.json')), {
      explorer: true,
    })
  );

  app.use(
    `/${AppConst.API_PREFIX}/${AppConst.API_VERSION}`,
    (() => {
      globSync(join(__dirname, '../modules/**/**.controller.[tj]s')).forEach(
        (path: string) => new (require(path).default)()
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
