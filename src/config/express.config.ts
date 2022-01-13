import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export const expressConfig = (app: Express): void => {
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(morgan('dev'));
};
