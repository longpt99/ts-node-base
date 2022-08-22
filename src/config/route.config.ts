import { Application, Request, Response } from 'express';
import glob from 'glob';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { ErrorHandler } from '../libs/error';
import { RouteConfig } from '../libs/router';
import { logger } from '../utils';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const routeConfig = async (app: Application): Promise<void> => {
  // app.use(
  //   '/api-docs',
  //   swaggerUi.serve,
  //   swaggerUi.setup(
  //     await import(`file://${path.join(__dirname, '../../doc/swagger.json')}`),
  //     { explorer: true }
  //   )
  // );
  app.use(
    (() => {
      glob(
        path.join(__dirname, '../modules/**/**.controller.[tj]s'),
        async (_err, paths) => {
          for (let i = 0, len = paths.length; i < len; i++) {
            await import(`file://${paths[i]}`).then(
              (route) => new route.default()
            );
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
    return res.error(
      new ErrorHandler({
        message: getReasonPhrase(StatusCodes.NOT_FOUND),
        status: StatusCodes.NOT_FOUND,
      })
    );
  });
};
