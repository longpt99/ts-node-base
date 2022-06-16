import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { ErrorHandler } from '../libs/error';
import APP_CONFIG from './app.config';
import i18n from './i18n.config';

export const expressConfig = (app: Application): void => {
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.use(i18n.init);
  app.use(cookieParser(APP_CONFIG.ENV.SECURE.COOKIE_SECRET_KEY));

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ErrorHandler) {
      return res.error(err);
    }
  });
};
