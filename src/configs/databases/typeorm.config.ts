import { ConnectionOptions } from 'typeorm';
import APP_CONFIG from '../app.config';
import path from 'path';
import logger from '../../utils/logger';

const databaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: APP_CONFIG.ENV.DATABASE.POSTGRES.HOST,
  port: APP_CONFIG.ENV.DATABASE.POSTGRES.PORT,
  username: APP_CONFIG.ENV.DATABASE.POSTGRES.USERNAME,
  password: APP_CONFIG.ENV.DATABASE.POSTGRES.PASSWORD,
  database: APP_CONFIG.ENV.DATABASE.POSTGRES.NAME,
  entities: ['src/modules/**/*.entity.{js,ts}'],
  synchronize: false,
  // migrations: [path.join(__dirname, '../../migrations/*.{js,ts}')],
  // migrationsRun: true,
  // logging: true,
  // connectTimeoutMS: 20000,
  // maxQueryExecutionTime: 20000,
  // logNotifications: true,
  poolErrorHandler: (err) => {
    logger.error('Connection pool error', err);
  },
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default databaseConfig;
