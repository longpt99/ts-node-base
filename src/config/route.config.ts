import { Application, Request, Response } from 'express';
import glob from 'glob';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import { expressRouter } from '../libs';
import { ErrorHandler } from '../libs/error';
import { logger } from '../utils';

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
      (() => {
        glob(
          join(__dirname, '../modules/**/**.controller.[tj]s'),
          (_err, paths) => {
            for (let i = 0, len = paths.length; i < len; i++) {
              import(paths[i]).then((route) => {
                new route.default();
                expressRouter.stack.forEach((layer) => {
                  logger.info(
                    `[Router] ${layer.route.stack[0].method.toUpperCase()}: "${
                      layer.route.path
                    }" has been registered!`
                  );
                });
              });
            }
          }
        );
      })();
      return expressRouter;
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
