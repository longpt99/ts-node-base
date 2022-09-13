import { Application, NextFunction, Request, Response } from 'express';
import globSync from 'glob/sync';
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
      globSync(join(__dirname, '../modules/**/**.controller.[tj]s')).forEach(
        (path: string) => new (require(path).default)()
      );
      for (const layer of RouteConfig.expressRouter.stack) {
        logger.info(
          `[Router] ${layer.route.stack[0].method.toUpperCase()}: "${
            layer.route.path
          }" has been registered!`
        );
      }
      return RouteConfig.expressRouter;
    })()
  );

  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    return res.error(error);
  });

  app.use((_req: Request, res: Response) => {
    return res.error(new NotFoundError());
  });
};
