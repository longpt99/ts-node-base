import { Application, Request, Response } from 'express';
import globSync from 'glob/sync';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import { AppConst } from '../common/consts';
import { expressRouter } from '../libs';
import { ErrorHandler } from '../libs/error';
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
    (() => {
      globSync(join(__dirname, '../modules/**/**.controller.[tj]s')).forEach(
        (path: string) => new (require(path).default)()
      );
      expressRouter.stack.forEach((layer) => {
        logger.info(
          `[Router] ${layer.route.stack[0].method.toUpperCase()}: "${
            layer.route.path
          }" has been registered!`
        );
      });
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
