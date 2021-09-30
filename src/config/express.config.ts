import cors from 'cors';
import helmet from 'helmet';
import { Express } from 'express';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';

export const expressConfig = (app: Express): void => {
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: false }));
};
