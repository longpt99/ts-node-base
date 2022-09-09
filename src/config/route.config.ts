import { Application, Request, Response } from 'express';
import glob from 'glob';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import { NotFoundError } from '../libs/errors/not-found.error';
import { RouteConfig } from '../libs/router';
import logger from '../utils/logger';

export const routeConfig = async (app: Application): Promise<void> => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(await import(join(process.cwd(), './doc/swagger.json')), {
      explorer: true,
    })
  );

  app.use(
    (() => {
      glob(
        join(__dirname, '../modules/**/**.controller.[tj]s'),
        async (_err, paths) => {
          for (let i = 0, len = paths.length; i < len; i++) {
            await import(paths[i]).then((route) => new route.default());
          }
          RouteConfig.expressRouter.stack.forEach((layer) => {
            logger.info(
              `[Router] ${layer.route.stack[0].method.toUpperCase()}: "${
                layer.route.path
              }" has been registered!`
            );
          });
        }
      );
      return RouteConfig.expressRouter;
    })()
  );

  app.use((_req: Request, res: Response) => {
    return res.error(new NotFoundError());
  });
};
