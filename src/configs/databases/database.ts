import { createConnection } from 'typeorm';
import { IServer } from '../../common/interfaces/app.interface';
import logger from '../../utils/logger';
import APP_CONFIG from '../app.config';
import RedisConfig from './redis.config';
import databaseConfig from './typeorm.config';

export const databaseConnect = (app: IServer): void => {
  createConnection(databaseConfig)
    .then((connection) => {
      if (connection.isConnected) {
        logger.info(
          `[Database][${databaseConfig.type}] "${APP_CONFIG.ENV.DATABASE.POSTGRES.NAME}" has connected successfully!`
        );
        new RedisConfig().connectRedis();
        app.start();
      } else {
        logger.error(
          `[Database][${databaseConfig.type}] Database has lost connection.`
        );
      }
    })
    .catch((err) => {
      logger.error(err.stack);
      logger.error(
        `[Database][${databaseConfig.type}] Database connection error.`
      );
      process.exit();
    });
};
